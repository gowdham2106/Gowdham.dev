import { motion, useMotionValue, useScroll, useSpring, useTransform } from 'framer-motion'
import type { ReactNode, RefObject } from 'react'
import { ArrowDown, ArrowUpRight } from 'lucide-react'
import { useEffect, useRef, useState } from 'react'
import avatarPortrait from './assets/avatar-portrait.png'
import projectThreeHero from './assets/project-three-hero.jpg'
import projectThreeHub from './assets/project-three-hub.jpg'
import projectThreeLogin from './assets/project-three-login.jpg'
import projectThreeManufacturing from './assets/project-three-manufacturing.jpg'
import projectThreeRange from './assets/project-three-range.jpg'
import projectThreeWorkflow from './assets/project-three-workflow.jpg'
import projectTwoAssistant from './assets/project-two-assistant.jpg'
import projectTwoLanding from './assets/project-two-landing.jpg'
import projectTwoVerification from './assets/project-two-verification.jpg'

type FadeInProps = {
  children: ReactNode
  delay?: number
  duration?: number
  x?: number
  y?: number
  className?: string
}

type BouncingAvatarProps = {
  containerRef: RefObject<HTMLElement | null>
  src: string
  alt: string
}

type AnimatedTextProps = {
  text: string
  className?: string
}

const navLinks = ['About', 'Price', 'Projects', 'Contact']

const heroParticles = [
  { left: '14%', top: '34%', size: 5, duration: 5.2, delay: 0.2, dx: 12, dy: -22 },
  { left: '26%', top: '68%', size: 4, duration: 6.1, delay: 1.1, dx: -14, dy: -28 },
  { left: '72%', top: '30%', size: 6, duration: 4.8, delay: 0.5, dx: -10, dy: -20 },
  { left: '84%', top: '58%', size: 4, duration: 5.8, delay: 1.6, dx: 14, dy: -24 },
  { left: '38%', top: '44%', size: 3, duration: 4.4, delay: 0.8, dx: 8, dy: -18 },
  { left: '63%', top: '64%', size: 5, duration: 6.4, delay: 0.3, dx: -12, dy: -26 },
]

const services = [
  {
    number: '01',
    title: 'Web Application Development ',
    description:
      'Transforming ideas into high-performance web applications using modern frameworks, scalable architectures, and industry best practices.',
  },
  {
    number: '02',
    title: 'UI/UX Engineering',
    description:
      'Designing intuitive and engaging user interfaces and experiences that prioritize usability and accessibility.',
  },
  {
    number: '03',
    title: 'API & Database Development',
    description:
      'Designing and implementing robust APIs and database solutions that power modern web applications.',
  },
  {
    number: '04',
    title: 'Branding',
    description:
      'Crafting cohesive visual identities -- from logos to full brand systems -- that communicate a clear and memorable presence.',
  },
  {
    number: '05',
    title: 'Cloud Solutions',
    description:
      'Deploying and managing applications on cloud platforms with automated workflows, monitoring, and scalable infrastructure.',
  },
]

const projects = [
  {
    number: '01',
    category: 'Client',
    name: 'Semy Portfolio',
    images: [
      projectThreeRange, projectThreeManufacturing, projectThreeHero
    ],
  },
  {
    number: '02',
    category: 'personal',
    name: 'claimShield',
    images: [projectTwoVerification, projectTwoAssistant, projectTwoLanding],
  },
  {
    number: '03',
    category: 'Personal',
    name: 'Mission Maverics Hub',
    images: [projectThreeLogin, projectThreeWorkflow, projectThreeHub],
  },
]

const FadeIn = ({ children, delay = 0, duration = 0.7, x = 0, y = 30, className }: FadeInProps) => {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, x, y }}
      whileInView={{ opacity: 1, x: 0, y: 0 }}
      viewport={{ once: true, margin: '50px', amount: 0 }}
      transition={{ duration, delay, ease: [0.25, 0.1, 0.25, 1] }}
    >
      {children}
    </motion.div>
  )
}

const HeroAmbientBackground = ({ containerRef }: { containerRef: RefObject<HTMLElement | null> }) => {
  const pointerX = useMotionValue(0)
  const pointerY = useMotionValue(0)
  const smoothX = useSpring(pointerX, { stiffness: 70, damping: 20 })
  const smoothY = useSpring(pointerY, { stiffness: 70, damping: 20 })
  const inverseX = useTransform(smoothX, (value) => -value * 0.7)
  const inverseY = useTransform(smoothY, (value) => -value * 0.7)

  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    const onMove = (event: PointerEvent) => {
      const rect = container.getBoundingClientRect()
      const nx = (event.clientX - rect.left) / rect.width - 0.5
      const ny = (event.clientY - rect.top) / rect.height - 0.5
      pointerX.set(nx * 44)
      pointerY.set(ny * 36)
    }

    const onLeave = () => {
      pointerX.set(0)
      pointerY.set(0)
    }

    container.addEventListener('pointermove', onMove)
    container.addEventListener('pointerleave', onLeave)
    return () => {
      container.removeEventListener('pointermove', onMove)
      container.removeEventListener('pointerleave', onLeave)
    }
  }, [containerRef, pointerX, pointerY])

  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      <div
        className="absolute inset-0 opacity-25"
        style={{
          backgroundImage: 'radial-gradient(rgba(215, 226, 234, 0.28) 1px, transparent 1px)',
          backgroundSize: '28px 28px',
          maskImage: 'radial-gradient(circle at 50% 52%, black 18%, transparent 72%)',
          WebkitMaskImage: 'radial-gradient(circle at 50% 52%, black 18%, transparent 72%)',
        }}
      />

      <motion.div
        style={{ x: smoothX, y: smoothY }}
        animate={{ scale: [1, 1.12, 1], opacity: [0.35, 0.55, 0.35] }}
        transition={{ duration: 7.5, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute left-[18%] top-[24%] h-[280px] w-[280px] rounded-full bg-[radial-gradient(circle,rgba(182,0,168,0.28)_0%,rgba(118,33,176,0.08)_55%,transparent_75%)] blur-3xl sm:h-[380px] sm:w-[380px]"
      />

      <motion.div
        style={{ x: inverseX, y: inverseY }}
        animate={{ scale: [1.08, 0.96, 1.08], opacity: [0.25, 0.45, 0.25] }}
        transition={{ duration: 9, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute bottom-[10%] right-[16%] h-[260px] w-[260px] rounded-full bg-[radial-gradient(circle,rgba(190,76,0,0.24)_0%,rgba(118,33,176,0.1)_55%,transparent_75%)] blur-3xl sm:h-[360px] sm:w-[360px]"
      />

      {heroParticles.map((particle, index) => (
        <motion.span
          key={index}
          className="absolute rounded-full bg-[#D7E2EA]"
          style={{
            left: particle.left,
            top: particle.top,
            width: particle.size,
            height: particle.size,
            boxShadow: '0 0 10px rgba(215, 226, 234, 0.5)',
          }}
          animate={{
            x: [0, particle.dx, 0],
            y: [0, particle.dy, 0],
            opacity: [0.15, 0.7, 0.15],
            scale: [0.8, 1.35, 0.8],
          }}
          transition={{
            duration: particle.duration,
            delay: particle.delay,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
      ))}
    </div>
  )
}

const KineticHeroHeading = () => {
  const words = ["Hi,", "i'm", 'gowdham']
  let charCounter = 0

  return (
    <h1 className="mt-2 flex w-full flex-nowrap items-baseline justify-between whitespace-nowrap text-[11vw] font-black uppercase leading-none tracking-[-0.07em] sm:text-[11.5vw] md:mt-0 md:text-[12vw] lg:text-[12.6vw]">
      {words.map((word, wordIndex) => (
        <motion.span
          key={word}
          className="inline-flex overflow-hidden py-1"
          whileHover={{ y: -6, transition: { type: 'spring', stiffness: 360, damping: 14 } }}
        >
          {word.split('').map((char) => {
            const delay = 0.08 + charCounter * 0.032
            charCounter += 1
            return (
              <motion.span
                key={`${wordIndex}-${char}-${charCounter}`}
                className="hero-heading inline-block cursor-default"
                initial={{ y: '115%', opacity: 0, rotateZ: 6 }}
                animate={{ y: '0%', opacity: 1, rotateZ: 0 }}
                transition={{
                  duration: 0.65,
                  delay,
                  ease: [0.22, 1, 0.36, 1],
                }}
                whileHover={{
                  y: -10,
                  scale: 1.08,
                  rotateZ: -3,
                  transition: { type: 'spring', stiffness: 420, damping: 12 },
                }}
              >
                {char}
              </motion.span>
            )
          })}
        </motion.span>
      ))}
    </h1>
  )
}

const BouncingAvatar = ({ containerRef, src, alt }: BouncingAvatarProps) => {
  const avatarRef = useRef<HTMLDivElement | null>(null)
  const [isHovered, setIsHovered] = useState(false)

  const targetX = useMotionValue(0)
  const targetY = useMotionValue(0)
  const targetRotateX = useMotionValue(0)
  const targetRotateY = useMotionValue(0)
  const targetRotateZ = useMotionValue(0)
  const targetScale = useMotionValue(1)

  const bounceSpring = { stiffness: 260, damping: 11, mass: 0.7 }
  const tiltSpring = { stiffness: 220, damping: 14, mass: 0.8 }

  const x = useSpring(targetX, bounceSpring)
  const y = useSpring(targetY, bounceSpring)
  const rotateX = useSpring(targetRotateX, tiltSpring)
  const rotateY = useSpring(targetRotateY, tiltSpring)
  const rotateZ = useSpring(targetRotateZ, bounceSpring)
  const scale = useSpring(targetScale, { stiffness: 340, damping: 10, mass: 0.65 })
  const ringX = useTransform(x, (value) => -value * 0.55)
  const ringY = useTransform(y, (value) => -value * 0.55)

  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    const handlePointerMove = (event: PointerEvent) => {
      const avatarEl = avatarRef.current
      if (!avatarEl) return

      const rect = avatarEl.getBoundingClientRect()
      const centerX = rect.left + rect.width / 2
      const centerY = rect.top + rect.height / 2

      const dx = event.clientX - centerX
      const dy = event.clientY - centerY
      const maxRange = 320
      const nx = Math.max(-1, Math.min(1, dx / maxRange))
      const ny = Math.max(-1, Math.min(1, dy / maxRange))

      targetX.set(nx * 28)
      targetY.set(ny * 20 - (isHovered ? 12 : 0))
      targetRotateY.set(nx * 18)
      targetRotateX.set(-ny * 15)
      targetRotateZ.set(nx * 5)
    }

    const handlePointerLeave = () => {
      setIsHovered(false)
      targetX.set(0)
      targetY.set(0)
      targetRotateX.set(0)
      targetRotateY.set(0)
      targetRotateZ.set(0)
      targetScale.set(1)
    }

    container.addEventListener('pointermove', handlePointerMove)
    container.addEventListener('pointerleave', handlePointerLeave)

    return () => {
      container.removeEventListener('pointermove', handlePointerMove)
      container.removeEventListener('pointerleave', handlePointerLeave)
    }
  }, [containerRef, isHovered, targetRotateX, targetRotateY, targetRotateZ, targetScale, targetX, targetY])

  const triggerBounce = () => {
    scale.set(0.88)
    y.set(targetY.get() + 12)
    requestAnimationFrame(() => {
      targetScale.set(isHovered ? 1.09 : 1.04)
      targetY.set(-18)
      window.setTimeout(() => {
        targetScale.set(isHovered ? 1.06 : 1)
        targetY.set(isHovered ? -10 : 0)
      }, 150)
    })
  }

  return (
    <div className="relative flex items-center justify-center" style={{ perspective: 900 }}>
      <motion.div
        style={{ x: ringX, y: ringY }}
        animate={{ rotate: 360 }}
        transition={{ duration: 24, repeat: Infinity, ease: 'linear' }}
        className="pointer-events-none absolute h-[210px] w-[210px] rounded-full border border-white/10 sm:h-[265px] sm:w-[265px] md:h-[315px] md:w-[315px] lg:h-[360px] lg:w-[360px]"
      >
        <span className="absolute -top-1 left-1/2 h-2 w-2 -translate-x-1/2 rounded-full bg-[#B600A8] shadow-[0_0_12px_#B600A8]" />
      </motion.div>

      <motion.div
        style={{ x: ringX, y: ringY }}
        animate={{ rotate: -360 }}
        transition={{ duration: 18, repeat: Infinity, ease: 'linear' }}
        className="pointer-events-none absolute h-[175px] w-[175px] rounded-full border border-dashed border-[#D7E2EA]/15 sm:h-[220px] sm:w-[220px] md:h-[260px] md:w-[260px] lg:h-[300px] lg:w-[300px]"
      />

      <motion.div
        animate={{ y: isHovered ? 0 : [0, -8, 0] }}
        transition={{ duration: 3.6, repeat: Infinity, ease: 'easeInOut' }}
      >
        <motion.div
          ref={avatarRef}
          onPointerEnter={() => {
            setIsHovered(true)
            targetScale.set(1.07)
            targetY.set(-12)
          }}
          onPointerLeave={() => {
            setIsHovered(false)
            targetScale.set(1)
            targetY.set(0)
          }}
          onPointerDown={triggerBounce}
          style={{
            x,
            y,
            rotateX,
            rotateY,
            rotateZ,
            scale,
            transformStyle: 'preserve-3d',
            willChange: 'transform',
          }}
          className="group relative cursor-pointer select-none"
        >
          <motion.div
            animate={{ scale: [0.96, 1.06, 0.96], opacity: [0.55, 0.85, 0.55] }}
            transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
            className="pointer-events-none absolute -inset-3 rounded-full bg-[radial-gradient(circle_at_50%_45%,rgba(182,0,168,0.34),rgba(118,33,176,0.16)_52%,transparent_75%)] blur-xl transition-opacity duration-300 group-hover:opacity-100"
          />
          <img
            src={src}
            alt={alt}
            draggable={false}
            className="relative aspect-[4/5] w-[165px] object-contain drop-shadow-[0_18px_36px_rgba(0,0,0,0.72)] sm:w-[210px] md:w-[250px] lg:w-[290px]"
          />
        </motion.div>
      </motion.div>
    </div>
  )
}

function AnimatedChar({
  char,
  index,
  total,
  scrollYProgress,
}: {
  char: string
  index: number
  total: number
  scrollYProgress: any
}) {
  const opacity = useTransform(scrollYProgress, (value: number) => {
    const revealProgress = (value - index / total) * 2.4 + 0.1
    return Math.min(1, Math.max(0.2, revealProgress))
  })

  return (
    <motion.span style={{ opacity }} className="relative inline-block">
      {char === ' ' ? '\u00A0' : char}
    </motion.span>
  )
}

const AnimatedText = ({ text, className }: AnimatedTextProps) => {
  const ref = useRef<HTMLParagraphElement | null>(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start 0.8', 'end 0.2'],
  })

  return (
    <p ref={ref} className={className}>
      {text.split('').map((char, index) => (
        <AnimatedChar key={`${char}-${index}`} char={char} index={index} total={text.length} scrollYProgress={scrollYProgress} />
      ))}
    </p>
  )
}

const FLIGHT_PATH =
  'M -30 165 C 110 195, 225 265, 315 268 C 395 270, 415 170, 345 162 C 275 154, 245 238, 310 296 C 395 372, 760 495, 1115 615'

function HeroAirplaneFlight() {
  const pathRef = useRef<SVGPathElement | null>(null)
  const [flightState, setFlightState] = useState({
    x: -30,
    y: 165,
    angle: 14,
    dashOffset: 2200,
    totalLength: 2200,
    trailOpacity: 1,
    planeOpacity: 1,
  })

  useEffect(() => {
    const pathEl = pathRef.current
    if (!pathEl) return

    const totalLength = pathEl.getTotalLength()
    const cycleMs = 6800
    let animationFrameId = 0
    let startTime: number | null = null

    const updateFrame = (timestamp: number) => {
      if (startTime === null) startTime = timestamp
      const elapsed = (timestamp - startTime) % cycleMs
      const cycleProgress = elapsed / cycleMs

      const flyEnd = 0.8
      const fadeEnd = 0.94

      if (cycleProgress <= flyEnd) {
        const t = cycleProgress / flyEnd
        const dist = t * totalLength
        const point = pathEl.getPointAtLength(dist)
        const ahead = pathEl.getPointAtLength(Math.min(totalLength, dist + 2))
        const behind = pathEl.getPointAtLength(Math.max(0, dist - 2))
        const angle = (Math.atan2(ahead.y - behind.y, ahead.x - behind.x) * 180) / Math.PI

        setFlightState({
          x: point.x,
          y: point.y,
          angle,
          dashOffset: totalLength * (1 - t),
          totalLength,
          trailOpacity: 1,
          planeOpacity: t < 0.04 ? t / 0.04 : t > 0.95 ? (1 - t) / 0.05 : 1,
        })
      } else if (cycleProgress <= fadeEnd) {
        const fadeT = (cycleProgress - flyEnd) / (fadeEnd - flyEnd)
        setFlightState((prev) => ({
          ...prev,
          dashOffset: 0,
          totalLength,
          trailOpacity: 1 - fadeT,
          planeOpacity: 0,
        }))
      } else {
        setFlightState((prev) => ({
          ...prev,
          dashOffset: totalLength,
          totalLength,
          trailOpacity: 0,
          planeOpacity: 0,
        }))
      }

      animationFrameId = window.requestAnimationFrame(updateFrame)
    }

    animationFrameId = window.requestAnimationFrame(updateFrame)
    return () => window.cancelAnimationFrame(animationFrameId)
  }, [])

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 z-[4] overflow-hidden"
    >
      <svg
        viewBox="0 0 1200 700"
        preserveAspectRatio="xMidYMid slice"
        className="h-full w-full"
        fill="none"
      >
          <defs>
            <mask id="flight-trail-reveal" maskUnits="userSpaceOnUse">
              <path
                d={FLIGHT_PATH}
                stroke="#FFFFFF"
                strokeWidth="10"
                strokeLinecap="round"
                strokeDasharray={flightState.totalLength}
                strokeDashoffset={flightState.dashOffset}
              />
            </mask>
            <filter id="plane-glow" x="-40%" y="-40%" width="180%" height="180%">
              <feDropShadow dx="0" dy="0" stdDeviation="3" floodColor="#FFFFFF" floodOpacity="0.4" />
            </filter>
          </defs>

          <path
            ref={pathRef}
            d={FLIGHT_PATH}
            stroke="rgba(255,255,255,0.08)"
            strokeWidth="1.5"
            strokeDasharray="7 7"
            strokeLinecap="round"
          />

          <path
            d={FLIGHT_PATH}
            stroke="#FFFFFF"
            strokeWidth="2"
            strokeDasharray="7 7"
            strokeLinecap="round"
            mask="url(#flight-trail-reveal)"
            opacity={flightState.trailOpacity * 0.85}
          />

          <g
            transform={`translate(${flightState.x}, ${flightState.y}) rotate(${flightState.angle}) scale(0.75)`}
            opacity={flightState.planeOpacity}
            filter="url(#plane-glow)"
          >
            <path
              d="M 18 0 C 18 -1.8 14 -3 9 -3 L 2 -3 L -8 -17 L -12 -17 L -5 -3 L -13 -3 L -17 -8 L -20 -8 L -17 0 L -20 8 L -17 8 L -13 3 L -5 3 L -12 17 L -8 17 L 2 3 L 9 3 C 14 3 18 1.8 18 0 Z"
              fill="#FFFFFF"
            />
          </g>
        </svg>
    </div>
  )
}

function ContactButton() {
  return (
    <motion.a
      href="#contact"
      whileHover={{ scale: 1.04, y: -2 }}
      whileTap={{ scale: 0.96 }}
      transition={{ type: 'spring', stiffness: 360, damping: 16 }}
      className="relative inline-flex items-center justify-center overflow-hidden rounded-full border border-white/20 uppercase tracking-[0.22em] text-white shadow-[0_4px_14px_rgba(181,1,167,0.3)]"
      style={{
        background: 'linear-gradient(123deg, #18011F 7%, #B600A8 37%, #7621B0 72%, #BE4C00 100%)',
        boxShadow: '4px 4px 12px #7721B1 inset',
        borderColor: 'rgba(255,255,255,0.8)',
        borderWidth: '2px',
        outline: '2px solid rgba(255,255,255,0.9)',
        outlineOffset: '-3px',
        padding: '0.55rem 1.4rem',
      }}
    >
      <motion.span
        aria-hidden="true"
        animate={{ x: ['-130%', '220%'] }}
        transition={{ duration: 2.8, repeat: Infinity, repeatDelay: 2.4, ease: 'easeInOut' }}
        className="pointer-events-none absolute inset-y-0 left-0 w-1/2 -skew-x-12 bg-gradient-to-r from-transparent via-white/30 to-transparent"
      />
      <span className="relative text-[9px] font-medium sm:text-[10px] md:text-xs">Contact Me</span>
    </motion.a>
  )
}

function LiveProjectButton() {
  return (
    <button
      type="button"
      className="inline-flex items-center justify-center rounded-full border-2 border-[#D7E2EA] px-7 py-2.5 text-[0.75rem] font-medium uppercase tracking-[0.22em] text-[#D7E2EA] transition hover:bg-[#D7E2EA]/10 sm:px-9 sm:py-3 sm:text-sm"
    >
      Live Project
    </button>
  )
}

function ProjectCard({
  project,
  index,
  scrollYProgress,
}: {
  project: (typeof projects)[number]
  index: number
  scrollYProgress: any
}) {
  const targetScale = 1 - (projects.length - 1 - index) * 0.03
  const scale = useTransform(scrollYProgress, [0, 1], [1, targetScale])

  return (
    <motion.article
      className="sticky top-20 h-[70vh] min-h-[420px] overflow-hidden rounded-[30px] border-2 border-[#D7E2EA] bg-[#0C0C0C] p-3 sm:rounded-[38px] sm:p-4 md:top-24 md:rounded-[45px] md:p-6"
      style={{
        top: `${64 + index * 18}px`,
        scale,
      }}
    >
      <div className="flex h-full flex-col gap-5">
        <div className="flex items-start justify-between gap-3">
          <div className="flex items-center gap-3 md:gap-4">
            <span className="text-[clamp(2rem,6.5vw,84px)] font-black leading-none tracking-[-0.08em] text-[#D7E2EA]">
              {project.number}
            </span>
            <span className="text-[0.6rem] font-medium uppercase tracking-[0.22em] text-[#D7E2EA] opacity-80 sm:text-[0.65rem] md:text-xs">
              {project.category}
            </span>
          </div>

          <div className="flex items-center gap-2 sm:gap-3 md:gap-4">
            <span className="text-[clamp(0.95rem,1.8vw,1.65rem)] font-medium uppercase tracking-[-0.05em] text-[#D7E2EA]">
              {project.name}
            </span>
            <LiveProjectButton />
          </div>
        </div>

        <div className="grid flex-1 grid-cols-1 gap-3 md:grid-cols-[40%_60%]">
          <div className="flex flex-col gap-3">
            <div className="overflow-hidden rounded-[24px] border border-white/15 sm:rounded-[30px]">
              <img src={project.images[0]} alt={project.name} className="h-[clamp(110px,13vw,180px)] w-full object-cover" />
            </div>
            <div className="overflow-hidden rounded-[24px] border border-white/15 sm:rounded-[30px]">
              <img src={project.images[1]} alt={project.name} className="h-[clamp(140px,17vw,240px)] w-full object-cover" />
            </div>
          </div>

          <div className="overflow-hidden rounded-[24px] border border-white/15 sm:rounded-[30px]">
            <img src={project.images[2]} alt={project.name} className="h-full min-h-[220px] w-full object-cover" />
          </div>
        </div>
      </div>
    </motion.article>
  )
}

function App() {
  const heroRef = useRef<HTMLElement | null>(null)
  const projectSectionRef = useRef<HTMLDivElement | null>(null)
  const { scrollYProgress } = useScroll({
    target: projectSectionRef,
    offset: ['start start', 'end end'],
  })

  return (
    <main className="min-h-screen overflow-x-clip bg-[#0C0C0C] text-[#D7E2EA]">
      <section ref={heroRef} className="relative h-screen min-h-[600px] overflow-x-clip bg-[#0C0C0C] px-0">
        <HeroAmbientBackground containerRef={heroRef} />
        <HeroAirplaneFlight />

        <nav className="relative z-20 flex items-center justify-between px-4 pt-5 text-[#D7E2EA] md:px-8 md:pt-7">
          <div className="flex w-full items-center justify-between">
            <motion.div
              initial={{ opacity: 0, x: -16 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
              className="hidden items-center gap-2.5 sm:flex sm:w-1/4"
            >
              <span className="relative flex h-2.5 w-2.5">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#B600A8] opacity-75" />
                <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-[#B600A8]" />
              </span>
              <span className="text-[11px] font-medium uppercase tracking-[0.2em] text-[#D7E2EA]/80">
                Available 2026
              </span>
            </motion.div>

            <div className="flex flex-1 items-center justify-between gap-3 sm:gap-5 md:gap-8">
              {navLinks.map((link, index) => (
                <motion.a
                  key={link}
                  href={link === 'About' ? '#about' : link === 'Price' ? '#services' : link === 'Projects' ? '#projects' : '#contact'}
                  initial={{ opacity: 0, y: -14 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.55, delay: 0.08 * index, ease: [0.22, 1, 0.36, 1] }}
                  whileHover={{ y: -2 }}
                  className="group relative text-[0.65rem] font-medium uppercase tracking-[0.16em] text-[#D7E2EA] transition duration-200 hover:text-white sm:text-xs md:text-base lg:text-[1.1rem]"
                >
                  {link}
                  <span className="absolute -bottom-1 left-0 h-[1.5px] w-0 bg-gradient-to-r from-[#B600A8] to-[#BE4C00] transition-all duration-300 group-hover:w-full" />
                </motion.a>
              ))}
            </div>
          </div>
        </nav>

        <div className="relative z-10 flex h-[calc(100vh-88px)] flex-col justify-between px-4 pb-6 sm:px-6 sm:pb-7 md:px-8 md:pb-8">
          <KineticHeroHeading />

          <div className="flex items-end justify-between gap-6">
            <motion.div
              initial={{ opacity: 0, x: -24 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.75, delay: 0.45, ease: [0.22, 1, 0.36, 1] }}
              className="w-full max-w-[145px] sm:max-w-[190px] md:max-w-[220px]"
            >
              <p className="text-[clamp(0.7rem,1.15vw,1.08rem)] font-light uppercase leading-snug tracking-[0.12em] text-[#D7E2EA]">
                A software developer passionate about building innovative and unforgettable solutions.
              </p>
            </motion.div>

            <motion.a
              href="#about"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.85 }}
              className="hidden flex-col items-center gap-1.5 text-[10px] uppercase tracking-[0.22em] text-[#D7E2EA]/60 transition hover:text-[#D7E2EA] md:flex"
            >
              <span>Scroll</span>
              <motion.span
                animate={{ y: [0, 6, 0] }}
                transition={{ duration: 1.6, repeat: Infinity, ease: 'easeInOut' }}
              >
                <ArrowDown className="h-3.5 w-3.5" />
              </motion.span>
            </motion.a>

            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 18 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ type: 'spring', stiffness: 240, damping: 16, delay: 0.55 }}
            >
              <ContactButton />
            </motion.div>
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 40, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ type: 'spring', stiffness: 180, damping: 15, delay: 0.45 }}
          className="absolute left-1/2 top-[55%] z-20 -translate-x-1/2 -translate-y-1/2 sm:top-auto sm:bottom-5 sm:translate-y-0"
        >
          <BouncingAvatar containerRef={heroRef} src={avatarPortrait} alt="Gowdham portrait" />
        </motion.div>
      </section>

      <section id="about" className="relative bg-[#0C0C0C] px-5 py-12 sm:px-8 sm:py-16 md:px-10">
        <FadeIn delay={0.1} duration={0.9} x={-80} className="absolute left-[1%] top-[4%] sm:left-[2%] md:left-[4%]">
          <img src="https://shrug-person-78902957.figma.site/_components/v2/ebb2b8f25d8e24d5f0a5ca8af4c950de81aa2fd7/moon_icon.11395d36.png" alt="moon icon" className="w-[105px] sm:w-[145px] md:w-[185px]" />
        </FadeIn>
        <FadeIn delay={0.25} duration={0.9} x={-80} className="absolute bottom-[8%] left-[3%] sm:left-[6%] md:left-[10%]">
          <img src="https://shrug-person-78902957.figma.site/_components/v2/ebb2b8f25d8e24d5f0a5ca8af4c950de81aa2fd7/p59_1.4659672e.png" alt="3D object" className="w-[95px] sm:w-[130px] md:w-[165px]" />
        </FadeIn>
        <FadeIn delay={0.15} duration={0.9} x={80} className="absolute right-[1%] top-[4%] sm:right-[2%] md:right-[4%]">
          <img src="https://shrug-person-78902957.figma.site/_components/v2/ebb2b8f25d8e24d5f0a5ca8af4c950de81aa2fd7/lego_icon-1.703bb594.png" alt="Lego icon" className="w-[105px] sm:w-[145px] md:w-[185px]" />
        </FadeIn>
        <FadeIn delay={0.3} duration={0.9} x={80} className="absolute bottom-[8%] right-[3%] sm:right-[6%] md:right-[10%]">
          <img src="https://shrug-person-78902957.figma.site/_components/v2/ebb2b8f25d8e24d5f0a5ca8af4c950de81aa2fd7/Group_134-1.2e04f3ce.png" alt="3D group" className="w-[115px] sm:w-[155px] md:w-[195px]" />
        </FadeIn>

        <div className="relative z-10 flex min-h-[68vh] flex-col items-center justify-center gap-10 text-center sm:min-h-[74vh] sm:gap-12 md:gap-14">
          <FadeIn delay={0} duration={0.8} y={40}>
            <h2 className="hero-heading text-[clamp(2.8rem,10vw,136px)] font-black uppercase leading-none tracking-[-0.08em]">
              About me
            </h2>
          </FadeIn>

          <div className="max-w-[540px] text-center">
            <AnimatedText
              text="With more than five years of experience in design, i focus on branding, web design, and user experience, i truly enjoy working with businesses that aim to stand out and present their best image. Let's build something incredible together!"
              className="text-center text-[clamp(0.95rem,1.8vw,1.28rem)] font-medium leading-relaxed text-[#D7E2EA]"
            />
          </div>

          <FadeIn delay={0.1} duration={0.7} y={20}>
            <ContactButton />
          </FadeIn>
        </div>
      </section>

      <section id="services" className="rounded-t-[40px] bg-[#FFFFFF] px-5 py-16 sm:rounded-t-[50px] sm:px-8 sm:py-20 md:rounded-t-[60px] md:px-10 md:py-24">
        <h2 className="mb-10 text-center text-[clamp(2.3rem,7.5vw,98px)] font-black uppercase leading-none tracking-[-0.08em] text-[#0C0C0C] sm:mb-12 md:mb-16">
          Services
        </h2>

        <div className="mx-auto max-w-5xl">
          {services.map((service, index) => (
            <FadeIn key={service.title} delay={index * 0.1} duration={0.7} className="border-t border-[rgba(12,12,12,0.15)] py-6 first:border-t-0 sm:py-7 md:py-9">
              <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:gap-6 md:gap-8">
                <div className="text-[clamp(2.1rem,7vw,86px)] font-black leading-none tracking-[-0.08em] text-[#0C0C0C]">
                  {service.number}
                </div>
                <div className="flex-1">
                  <h3 className="text-[clamp(0.95rem,1.7vw,1.55rem)] font-medium uppercase tracking-[-0.04em] text-[#0C0C0C]">
                    {service.title}
                  </h3>
                  <p className="mt-2 max-w-2xl text-[clamp(0.78rem,1.2vw,1rem)] font-light leading-relaxed text-[#0C0C0C] opacity-60">
                    {service.description}
                  </p>
                </div>
              </div>
            </FadeIn>
          ))}
        </div>
      </section>

      <section id="projects" ref={projectSectionRef} className="relative z-10 -mt-8 rounded-t-[40px] bg-[#0C0C0C] sm:-mt-10 sm:rounded-t-[50px] md:-mt-12 md:rounded-t-[60px]">
        <div className="mx-auto max-w-[1440px] px-4 pb-12 pt-8 sm:px-6 md:px-8 md:pt-12">
          <h2 className="hero-heading mb-8 text-center text-[clamp(2.5rem,8vw,96px)] font-black uppercase leading-none tracking-[-0.08em] sm:mb-10 md:mb-12">
            Project
          </h2>

          <div className="relative space-y-8">
            {projects.map((project, index) => (
              <ProjectCard key={project.name} project={project} index={index} scrollYProgress={scrollYProgress} />
            ))}
          </div>
        </div>
      </section>

      <footer id="contact" className="bg-[#0C0C0C] py-12 text-center text-[#D7E2EA]">
        <div className="mx-auto flex max-w-2xl flex-col items-center gap-4 px-5">
          <p className="text-[clamp(0.85rem,1.6vw,1.15rem)] uppercase tracking-[0.25em] text-[#D7E2EA]/80">
            Let&apos;s create something unforgettable
          </p>
          <a href="mailto:gowdhamgokuldas@gmail.com" className="inline-flex items-center gap-2 text-[clamp(1.6rem,3.6vw,3.5rem)] font-black uppercase tracking-[-0.08em] text-[#D7E2EA]">
            gowdhamgokuldas@gmail.com <ArrowUpRight className="h-7 w-7 sm:h-9 sm:w-9" />
          </a>
        </div>
      </footer>
    </main>
  )
}

export default App
