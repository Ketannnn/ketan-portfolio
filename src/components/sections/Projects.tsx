import { motion } from "framer-motion";
import { ExternalLink, ArrowUpRight } from "lucide-react";
import { SectionHeader } from "../ui/SectionHeader";
import { GlassCard } from "../ui/GlassCard";
import { SkillBadge } from "../ui/SkillBadge";
import { Button } from "../ui/Button";
import { ApiConsoleMock } from "../mocks/ApiConsoleMock";
import { AiFitnessMock } from "../mocks/AiFitnessMock";
import { projects } from "../../data/projects";
import { useScrollReveal, fadeUp, staggerContainer, staggerItem } from "../../hooks/useScrollReveal";

function ProjectMock({ type }: { type: "api-console" | "ai-fitness" }) {
  if (type === "api-console") return <ApiConsoleMock />;
  return <AiFitnessMock />;
}

export function Projects() {
  const { ref, isInView } = useScrollReveal();

  return (
    <section
      id="projects"
      role="region"
      aria-label="Selected projects"
      className="py-24 sm:py-32"
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <motion.div
          ref={ref}
          variants={staggerContainer}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          {/* Header */}
          <motion.div variants={fadeUp} className="mb-4">
            <SectionHeader
              eyebrow="// projects"
              heading="Selected Works"
            />
          </motion.div>
          <motion.div variants={fadeUp} className="mb-14 flex items-center justify-between">
            <p className="text-muted text-sm">Products, not just projects.</p>
            <a
              href="https://github.com/Ketannnn"
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs text-accent hover:text-white flex items-center gap-1 transition-colors duration-200 font-mono"
            >
              Explore all repositories
              <ArrowUpRight size={12} />
            </a>
          </motion.div>

          {/* Project cards */}
          <div className="space-y-8">
            {projects.map((project, index) => (
              <motion.div key={project.id} variants={staggerItem}>
                <GlassCard
                  as="article"
                  className="p-6 sm:p-8 grid lg:grid-cols-2 gap-8 items-start"
                >
                  {/* Left — info */}
                  <div className="flex flex-col gap-5">
                    {/* Title + status */}
                    <div>
                      <div className="flex flex-wrap items-center gap-2 mb-2">
                        <h3 className="text-lg font-semibold text-white">
                          {project.title}
                        </h3>
                        {project.status && (
                          <span className="text-[10px] font-semibold tracking-widest uppercase px-2 py-0.5 rounded-full bg-yellow-400/10 border border-yellow-400/25 text-yellow-400">
                            {project.status}
                          </span>
                        )}
                      </div>
                      <p className="text-sm text-zinc-400 leading-relaxed">
                        {project.subtitle}
                      </p>
                    </div>

                    {/* Feature list */}
                    <ul className="space-y-2.5">
                      {project.features.map((feat, i) => (
                        <li
                          key={i}
                          className="flex gap-3 text-xs text-zinc-400 leading-relaxed"
                        >
                          <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-accent shrink-0" />
                          {feat}
                        </li>
                      ))}
                    </ul>

                    {/* Stack */}
                    <div className="flex flex-wrap gap-2">
                      {project.stack.map((tech) => (
                        <SkillBadge key={tech} label={tech} />
                      ))}
                    </div>

                    {/* Action buttons */}
                    <div className="flex flex-wrap gap-2 pt-1">
                      {project.liveUrl && (
                        <Button
                          variant="primary"
                          size="sm"
                          href={project.liveUrl}
                          target="_blank"
                          icon={<ExternalLink size={12} />}
                          iconPosition="right"
                        >
                          Live Demo
                        </Button>
                      )}
                      <Button
                        variant="ghost"
                        size="sm"
                        href={project.githubUrl}
                        target="_blank"
                        icon={<ArrowUpRight size={12} />}
                        iconPosition="right"
                      >
                        GitHub
                      </Button>
                    </div>
                  </div>

                  {/* Right — mock UI */}
                  <div className="w-full">
                    <ProjectMock type={project.mockType} />
                  </div>
                </GlassCard>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
