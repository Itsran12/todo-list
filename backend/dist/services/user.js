"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserService = void 0;
const user_model_1 = require("../models/user-model");
const validation_1 = require("../validation/validation");
const user_validation_1 = require("../validation/user-validation");
const database_1 = require("../app/database");
const response_error_1 = require("../error/response-error");
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
class UserService {
    static register(request) {
        return __awaiter(this, void 0, void 0, function* () {
            const registerRequest = validation_1.Validation.Validate(user_validation_1.UserValidation.REGISTER, request);
            const emailExists = yield database_1.prismaClient.user.findUnique({
                where: {
                    email: registerRequest.email
                }
            });
            if (emailExists) {
                throw new response_error_1.ResponseError(400, "Email already exists");
            }
            const hashedPassword = yield bcrypt_1.default.hash(registerRequest.password, 10);
            const createUser = yield database_1.prismaClient.user.create({
                data: {
                    username: registerRequest.username,
                    email: registerRequest.email,
                    password: hashedPassword
                }
            });
            return (0, user_model_1.toUserResponse)(createUser);
        });
    }
    static get(user) {
        return __awaiter(this, void 0, void 0, function* () {
            return (0, user_model_1.toUserResponse)(user);
        });
    }
    static update(user, request) {
        return __awaiter(this, void 0, void 0, function* () {
            const updateRequest = validation_1.Validation.Validate(user_validation_1.UserValidation.UPDATE, request);
            const updateData = {};
            if (updateRequest.username) {
                updateData.username = updateRequest.username;
            }
            if (updateRequest.password) {
                updateData.password = yield bcrypt_1.default.hash(updateRequest.password, 10);
            }
            const result = yield database_1.prismaClient.user.update({
                where: {
                    id: user.id
                },
                data: updateData
            });
            return (0, user_model_1.toUserResponse)(result);
        });
    }
    static login(request) {
        return __awaiter(this, void 0, void 0, function* () {
            const loginRequest = validation_1.Validation.Validate(user_validation_1.UserValidation.LOGIN, request);
            let user = yield database_1.prismaClient.user.findUnique({
                where: {
                    email: loginRequest.email
                }
            });
            if (!user) {
                throw new response_error_1.ResponseError(400, "Email or Password invalid");
            }
            const isPasswordValid = yield bcrypt_1.default.compare(loginRequest.password, user.password);
            if (!isPasswordValid) {
                throw new response_error_1.ResponseError(400, "Email or Password invalid");
            }
            const token = jsonwebtoken_1.default.sign({
                id: user.id,
                username: user.username,
                email: user.email
            }, process.env.JWT_SECRET_KEY, { expiresIn: "1d" });
            user = yield database_1.prismaClient.user.update({
                where: {
                    email: loginRequest.email
                },
                data: {
                    token: token
                }
            });
            const response = (0, user_model_1.toUserResponse)(user);
            response.token = token;
            return response;
        });
    }
    static logout(user) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield database_1.prismaClient.user.update({
                where: {
                    id: user.id
                },
                data: {
                    token: null
                }
            });
            return (0, user_model_1.toUserResponse)(result);
        });
    }
}
exports.UserService = UserService;
