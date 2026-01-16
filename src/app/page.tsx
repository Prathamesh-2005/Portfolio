import BlurFade from "@/components/magicui/blur-fade";
import BlurFadeText from "@/components/magicui/blur-fade-text";
import TypingAnimation from "@/components/magicui/typing-animation";
import { TypingRotator } from "@/components/typing-rotator";
import { SkillCard3D } from "@/components/magicui/skill-card-3d";
import { ProjectCard } from "@/components/project-card";
import { ResumeCard } from "@/components/resume-card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { GitHubContributionGraph } from "@/components/github-contribution-graph";
import { DATA } from "@/data/resume";
import Link from "next/link";
import Markdown from "react-markdown";
import dynamic from "next/dynamic";
import Image from "next/image";

const SkillsCube3D = dynamic(() => import("@/components/skills-cube-3d").then(mod => ({ default: mod.SkillsCube3D })), {
  ssr: false,
  loading: () => <div className="w-full h-[500px] rounded-xl border border-border bg-gradient-to-br from-background to-muted/20 flex items-center justify-center">
    <p className="text-muted-foreground">Loading 3D Scene...</p>
  </div>
});

const Oneko = dynamic(() => import("../components/oneko").then(mod => ({ default: mod.Oneko })), {
  ssr: false,
});

const BLUR_FADE_DELAY = 0.04;

// Tech badge component with icon
const TechBadge = ({ name, icon }: { name: string; icon: string }) => (
  <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-muted/80 text-sm font-medium border border-border/50">
    <Image src={icon} alt={name} width={16} height={16} className="size-4" />
    {name}
  </span>
);

export default function Page() {
  return (
    <main className="flex flex-col min-h-[100dvh] space-y-10">
      <Oneko />

      <section id="hero">
        <div className="mx-auto w-full max-w-3xl space-y-8">
          <div className="flex items-center justify-between gap-4">
            <div className="flex-1 min-w-0">
              <BlurFade delay={BLUR_FADE_DELAY}>
                <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight lowercase">
                  hey, {DATA.name.split(" ")[0].toLowerCase()} here 👋
                </h1>
              </BlurFade>
            </div>
            <BlurFade delay={BLUR_FADE_DELAY}>
              <div className="relative">
                <Link
                  href="mailto:prathameshjadhav0198@gmail.com"
                  className="absolute -top-12 -left-20 flex flex-col items-end group z-10 hover:animate-shake"
                >
                  <span className="font-handwriting text-2xl -rotate-12 text-muted-foreground group-hover:text-primary transition-colors whitespace-nowrap mr-2">
                    HIRE ME
                  </span>
                  <svg
                    width="60"
                    height="40"
                    viewBox="0 0 100 100"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    className="text-muted-foreground group-hover:text-primary transition-colors rotate-12 -mt-2"
                  >
                    <path
                      d="M10,10 Q50,10 80,50"
                      stroke="currentColor"
                      strokeWidth="4"
                      fill="none"
                      markerEnd="url(#arrowhead)"
                    />
                    <path
                      d="M80,50 L70,45 M80,50 L75,35"
                      stroke="currentColor"
                      strokeWidth="4"
                      strokeLinecap="round"
                    />
                  </svg>
                </Link>

                <Avatar className="size-28 border">
                  <AvatarImage alt={DATA.name} src={DATA.avatarUrl} />
                  <AvatarFallback>{DATA.initials}</AvatarFallback>
                </Avatar>
              </div>
            </BlurFade>
          </div>
        </div>
      </section>

      {/* About section with hover effect */}
      <section id="about" className="section-hover pl-4">
        <BlurFade delay={BLUR_FADE_DELAY * 2}>
          <h2 className="text-xl font-bold mb-2">About</h2>
          <p className="text-base md:text-lg text-muted-foreground leading-relaxed">
            I build full-stack applications using{" "}
            <TechBadge name="Spring Boot" icon="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/spring/spring-original.svg" />{" "}
            ,{" "}
            <TechBadge name="React" icon="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg" />{" "}
            ,{" "}
            <TechBadge name="Supabase" icon="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/supabase/supabase-original.svg" />{" "}
            ,{" "}
            <TechBadge name="AWS" icon="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/amazonwebservices/amazonwebservices-plain-wordmark.svg" />{" "}
            and{" "}
            <TechBadge name="PostgreSQL" icon="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-original.svg" />{" "}
            . With a focus on <span className="font-semibold text-foreground">microservices</span> and{" "}
            <span className="font-semibold text-foreground">scalable systems</span>. Solved{" "}
            <span className="font-semibold text-foreground">650+ DSA</span> problems, driven by strong CS fundamentals.
          </p>
        </BlurFade>
      </section>

      <section id="github-contributions">
        <GitHubContributionGraph
          username="Prathamesh-2005"
          delay={BLUR_FADE_DELAY * 4.5}
        />
      </section>
      <section id="work" className="section-hover pl-4">
        <div className="flex min-h-0 flex-col gap-y-3">
          <BlurFade delay={BLUR_FADE_DELAY * 5}>
            <h2 className="text-xl font-bold">Work Experience</h2>
          </BlurFade>
          {DATA.work.map((work, id) => (
            <BlurFade
              key={work.company}
              delay={BLUR_FADE_DELAY * 6 + id * 0.05}
            >
              <ResumeCard
                key={work.company}
                logoUrl={work.logoUrl}
                altText={work.company}
                title={work.company}
                subtitle={work.title}
                href={work.href}
                badges={work.badges}
                period={`${work.start} - ${work.end ?? "Present"}`}
                description={work.description}
              />
            </BlurFade>
          ))}
        </div>
      </section>
      <section id="education" className="section-hover pl-4">
        <div className="flex min-h-0 flex-col gap-y-3">
          <BlurFade delay={BLUR_FADE_DELAY * 7}>
            <h2 className="text-xl font-bold">Education</h2>
          </BlurFade>
          {DATA.education.map((education, id) => (
            <BlurFade
              key={education.school}
              delay={BLUR_FADE_DELAY * 8 + id * 0.05}
            >
              <ResumeCard
                key={education.school}
                href={education.href}
                logoUrl={education.logoUrl}
                altText={education.school}
                title={education.school}
                subtitle={education.degree}
                period={`${education.start} - ${education.end}`}
              />
            </BlurFade>
          ))}
        </div>
      </section>
      <section id="skills" className="section-hover pl-4">
        <div className="flex min-h-0 flex-col gap-y-3">
          <BlurFade delay={BLUR_FADE_DELAY * 9}>
            <h2 className="text-xl font-bold">Skills</h2>
          </BlurFade>
          <div className="flex flex-wrap gap-1">
            {DATA.skills.map((skill, id) => (
              <BlurFade key={skill} delay={BLUR_FADE_DELAY * 9.5 + id * 0.05}>
                <Badge key={skill}>{skill}</Badge>
              </BlurFade>
            ))}
          </div>
          <BlurFade delay={BLUR_FADE_DELAY * 10.5}>
            <SkillsCube3D />
          </BlurFade>
        </div>
      </section>
      <section id="core-subjects" className="section-hover pl-4">
        <div className="flex min-h-0 flex-col gap-y-3">
          <BlurFade delay={BLUR_FADE_DELAY * 10.5}>
            <h2 className="text-xl font-bold">Core Subjects</h2>
          </BlurFade>
          <div className="flex flex-wrap gap-1">
            {DATA.coreSubjects.map((subject, id) => (
              <BlurFade key={subject} delay={BLUR_FADE_DELAY * 11 + id * 0.05}>
                <Badge key={subject}>{subject}</Badge>
              </BlurFade>
            ))}
          </div>
        </div>
      </section>
      <section id="projects">
        <div className="space-y-12 w-full py-12">
          <BlurFade delay={BLUR_FADE_DELAY * 11}>
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <div className="inline-block rounded-lg bg-foreground text-background px-3 py-1 text-sm">
                  My Projects
                </div>
                <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">
                  Check out my latest work
                </h2>
                <p className="text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  I&apos;ve worked on a variety of projects, from simple
                  websites to complex web applications. Here are a few of my
                  favorites.
                </p>
              </div>
            </div>
          </BlurFade>
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 max-w-[800px] mx-auto">
            {DATA.projects.map((project, id) => (
              <BlurFade
                key={project.title}
                delay={BLUR_FADE_DELAY * 12 + id * 0.05}
              >
                <ProjectCard
                  href={project.href}
                  key={project.title}
                  title={project.title}
                  description={project.description}
                  dates={project.dates}
                  tags={project.technologies}
                  image={project.image}
                  video={project.video}
                  links={project.links}
                />
              </BlurFade>
            ))}
          </div>
        </div>
      </section>
      <section id="contact">
        <div className="w-full py-12">
          <BlurFade delay={BLUR_FADE_DELAY * 16}>
            <div className="max-w-2xl mx-auto space-y-8">
              <div className="space-y-4 text-center">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl">
                  Ready to Build Something Amazing?
                </h2>
                <p className="text-muted-foreground text-lg">
                  Whether you have a project in mind, want to discuss tech, or just want to say hi — I&apos;d love to hear from you.
                </p>
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <Link
                  href={DATA.contact.social.email.url}
                  className="group relative overflow-hidden rounded-lg border bg-background p-6 hover:bg-accent transition-all hover:scale-105"
                >
                  <div className="flex items-center gap-4">
                    <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
                      <DATA.contact.social.email.icon className="h-6 w-6" />
                    </div>
                    <div className="flex-1 text-left">
                      <p className="font-semibold">Email Me</p>
                      <p className="text-sm text-muted-foreground">Quick response guaranteed</p>
                    </div>
                  </div>
                </Link>

                <Link
                  href={DATA.contact.social.LinkedIn.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group relative overflow-hidden rounded-lg border bg-background p-6 hover:bg-accent transition-all hover:scale-105"
                >
                  <div className="flex items-center gap-4">
                    <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
                      <DATA.contact.social.LinkedIn.icon className="h-6 w-6" />
                    </div>
                    <div className="flex-1 text-left">
                      <p className="font-semibold">Connect on LinkedIn</p>
                      <p className="text-sm text-muted-foreground">Let&apos;s network professionally</p>
                    </div>
                  </div>
                </Link>
              </div>

              <div className="text-center space-y-4">
                <p className="text-sm text-muted-foreground">
                  You can also find me on
                </p>
                <div className="flex justify-center gap-4">
                  {Object.entries(DATA.contact.social)
                    .filter(([key, social]) => social.navbar && key !== "email")
                    .map(([key, social]) => (
                      <Link
                        key={key}
                        href={social.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center justify-center w-12 h-12 rounded-full border bg-background hover:bg-accent transition-all hover:scale-110"
                      >
                        <social.icon className="h-5 w-5" />
                      </Link>
                    ))}
                </div>
              </div>
            </div>
          </BlurFade>
        </div>
      </section>
    </main>
  );
}