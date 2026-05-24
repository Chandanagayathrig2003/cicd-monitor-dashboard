import { motion } from 'framer-motion';

function MetricsCard({
  title,
  value,
  color
}) {
  return (
    <motion.div
      whileHover={{ scale: 1.03 }}
      className="bg-[#111827] p-6 rounded-2xl border border-gray-800 shadow-xl"
    >
      <h2 className="text-gray-400 text-sm">
        {title}
      </h2>

      <p
        className={`text-4xl font-bold mt-3 ${color}`}
      >
        {value}
      </p>
    </motion.div>
  );
}

export default MetricsCard;
