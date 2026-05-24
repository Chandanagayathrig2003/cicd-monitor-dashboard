import { motion } from 'framer-motion';
import {
  Activity,
  ShieldCheck,
  Server,
  Zap
} from 'lucide-react';

function HeroSection() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      className="
        relative
        overflow-hidden
        rounded-3xl
        p-10
        bg-gradient-to-r
        from-blue-600/20
        via-purple-600/20
        to-cyan-600/20
        border border-white/10
        backdrop-blur-xl
        shadow-2xl
        mb-10
      "
    >
      {/* Glow */}
      <div
        className="
          absolute
          -top-20
          -right-20
          w-72
          h-72
          bg-blue-500/20
          blur-3xl
        "
      />

      <div className="relative z-10">

        <div className="flex flex-col lg:flex-row justify-between gap-10">

          {/* Left */}
          <div>
            <h1 className="text-6xl font-black leading-tight">
              Enterprise
              <br />

              DevOps Monitoring
            </h1>

            <p className="text-gray-300 mt-6 text-lg max-w-2xl">
              Real-time CI/CD deployment observability,
              pipeline analytics, and distributed
              infrastructure monitoring platform.
            </p>

            <div className="flex gap-4 mt-8">

              <div className="flex items-center gap-2 bg-green-500/20 text-green-300 px-4 py-2 rounded-full border border-green-500/20">
                <ShieldCheck size={18} />
                API Healthy
              </div>

              <div className="flex items-center gap-2 bg-yellow-500/20 text-yellow-300 px-4 py-2 rounded-full border border-yellow-500/20">
                <Activity size={18} />
                3 Active Pipelines
              </div>

            </div>
          </div>

          {/* Right */}
          <div className="grid grid-cols-2 gap-5">

            <HeroStat
              icon={<Server />}
              title="Deployments"
              value="128"
            />

            <HeroStat
              icon={<Zap />}
              title="Success Rate"
              value="98.2%"
            />

            <HeroStat
              icon={<Activity />}
              title="Latency"
              value="42ms"
            />

            <HeroStat
              icon={<ShieldCheck />}
              title="Uptime"
              value="99.99%"
            />

          </div>
        </div>
      </div>
    </motion.div>
  );
}

function HeroStat({
  icon,
  title,
  value
}) {
  return (
    <div
      className="
        bg-black/30
        border border-white/10
        backdrop-blur-xl
        rounded-2xl
        p-5
      "
    >
      <div className="text-blue-400">
        {icon}
      </div>

      <p className="text-gray-400 mt-3 text-sm">
        {title}
      </p>

      <h2 className="text-3xl font-bold mt-2">
        {value}
      </h2>
    </div>
  );
}

export default HeroSection;
