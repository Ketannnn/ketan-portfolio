import { motion } from "framer-motion";
import { ExternalLink, ArrowUpRight } from "lucide-react";
import { SectionHeader } from "../ui/SectionHeader";
import { ProjectCard } from "../ui/ProjectCard";
import { SkillBadge } from "../ui/SkillBadge";
import { Button } from "../ui/Button";
import { projects, type Project } from "../../data/projects";
import { useScrollReveal, fadeUp, staggerContainer } from "../../hooks/useScrollReveal";

/**
 * Renders the right-column visual for a project card.
 * - If the project has a real screenshot, shows it as a responsive image
 *   with lazy loading and a subtle hover zoom (triggered by the parent card's
 *   `group` class).
 * - Falls back to the AiFitnessMock interactive component otherwise.
 */
function ProjectVisual({ project }: { project: Project }) {
  if (!project.screenshotUrl) return null;

  return (
    <div className="overflow-hidden rounded-xl border border-white/10 bg-[#090d17]">
      <motion.img
        src={project.screenshotUrl}
        alt={`${project.title} — application screenshot`}
        width={1024}
        height={615}
        className="w-full h-auto block"
        whileHover={{ scale: 1.02 }}
        transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
        loading="lazy"
        decoding="async"
      />
    </div>
  );
}


export function Projects() {
  const { ref, isInView } = useScrollReveal();

  return (
    <section
      id="projects"
      role="region"
      aria-label="Selected projects"
      className="py-16 sm:py-20 contain-paint"
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
              aria-label="Explore all GitHub repositories (opens in new tab)"
              className="text-xs text-accent hover:text-white flex items-center gap-1 transition-colors duration-200 font-mono"
            >
              Explore all repositories
              <ArrowUpRight size={12} />
            </a>
          </motion.div>

          {/* Project cards */}
          <div className="space-y-8">
            {projects.map((project, index) => (
              <motion.div
                key={project.id}
                variants={{
                  hidden: { opacity: 0, y: 40, x: index % 2 === 0 ? -30 : 30 },
                  visible: {
                    opacity: 1,
                    y: 0,
                    x: 0,
                    transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] }
                  }
                }}
              >
                <ProjectCard>
                  {/* Left — info */}
                  <div className="flex flex-col gap-5">
                    {/* Title + status */}
                    <div>
                      <div className="flex flex-wrap items-center gap-2 mb-2">
                        <h3 className="text-lg font-semibold text-white cursor-default">
                          <motion.span
                            className="inline-block"
                            initial={{ x: 0 }}
                            whileHover={{ x: 4 }}
                            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                          >
                            {project.title}
                          </motion.span>
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
                          <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-zinc-600 shrink-0" />
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
                          aria-label={`View ${project.title} live demo (opens in new tab)`}
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
                        aria-label={`View ${project.title} on GitHub (opens in new tab)`}
                      >
                        GitHub
                      </Button>
                    </div>
                  </div>

                  {/* Right — screenshot or mock UI */}
                  <div className="w-full">
                    <ProjectVisual project={project} />
                  </div>
                </ProjectCard>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
