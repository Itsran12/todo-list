import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'

export const ErrorPage = () => {
    return (
        <div className="min-h-screen bg-white flex items-center justify-center p-4">
            <div className="text-center space-y-12">
                <div className="relative overflow-hidden">
                <motion.div
                    initial={{ y: -100, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                >
                    <h1 className="text-[180px] font-black tracking-tighter text-black/5">
                    404
                    </h1>
                    <div className="absolute inset-0 flex items-center justify-center">
                    <h2 className="text-4xl font-light tracking-widest text-gray-800">
                        404 Error
                    </h2>
                    </div>
                </motion.div>
                </div>

                <motion.p
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.3, duration: 0.8 }}
                className="text-gray-500 text-lg font-light"
                >
                Halaman yang Anda cari tidak ditemukan
                </motion.p>

                <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.5, duration: 0.8 }}
                >
                <Link
                    to="/todo"
                    className="px-10 py-3 bg-black text-white rounded-full
                    hover:bg-gray-900 transition-all duration-300
                    focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-offset-2"
                >
                    Kembali
                </Link>
                </motion.div>
            </div>

            <div className="absolute inset-0 -z-10 overflow-hidden">
                <motion.div
                animate={{
                    rotate: 360,
                    transition: { duration: 20, repeat: Infinity, ease: "linear" }
                }}
                className="absolute top-1/4 left-1/4 w-64 h-64 rounded-full border border-gray-100"
                />
                <motion.div
                animate={{
                    rotate: -360,
                    transition: { duration: 25, repeat: Infinity, ease: "linear" }
                }}
                className="absolute bottom-1/4 right-1/4 w-96 h-96 rounded-full border border-gray-100"
                />
            </div>
        </div>
    )
}