import { motion } from 'framer-motion';

function MetricsCard({
  title,
  value,
  color
}) {
  return (
    <motion.div
      whileHover={{
        scale: 1.03
      }}
      className="
        bg-white/5
        backdrop-blur-xl
        border border-white/10
        rounded-3xl
        p-7
        shadow-2xl
        relative
        overflow-hidden
      "
    >
      {/* Glow */}
      <div
        className="
          absolute
          top-0
          right-0
          w-40
          h-40
          bg-blue-500/10
          blur-3xl
        "
      />

      <div className="relative z-10">
        <p className="text-gray-400 text-sm uppercase tracking-wider">
          {title}
        </p>

        <h2
          className={`text-5xl font-bold mt-5 ${color}`}
        >
          {value}
        </h2>
      </div>
    </motion.div>
  );
}

export default MetricsCard;
