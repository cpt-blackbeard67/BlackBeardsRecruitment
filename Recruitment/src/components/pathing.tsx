// import { motion } from "framer-motion"

// type Point = {
//     x: number
//     y: number
// }

// function cubicBezier(
//     p0: Point,
//     p1: Point,
//     p2: Point,
//     p3: Point,
//     t: number
// ): Point {
//     const u = 1 - t
//     const tt = t * t
//     const uu = u * u
//     const uuu = uu * u
//     const ttt = tt * t

//     return {
//         x:
//             uuu * p0.x +
//             3 * uu * t * p1.x +
//             3 * u * tt * p2.x +
//             ttt * p3.x,
//         y:
//             uuu * p0.y +
//             3 * uu * t * p1.y +
//             3 * u * tt * p2.y +
//             ttt * p3.y
//     }
// }


// function angleOnCurve(
//     p0: Point,
//     p1: Point,
//     p2: Point,
//     p3: Point,
//     t: number
// ) {
//     const p = cubicBezier(p0, p1, p2, p3, t)
//     const delta = 0.03
//     const next = cubicBezier(p0, p1, p2, p3, Math.min(t + delta, 1))


//     return Math.atan2(next.y - p.y, next.x - p.x) * 180 / Math.PI
// }


// function buildArcTable(
//     p0: Point,
//     p1: Point,
//     p2: Point,
//     p3: Point,
//     samples = 200
// ) {
//     const table: { t: number; length: number }[] = []
//     let prev = cubicBezier(p0, p1, p2, p3, 0)
//     let total = 0

//     table.push({ t: 0, length: 0 })

//     for (let i = 1; i <= samples; i++) {
//         const t = i / samples
//         const p = cubicBezier(p0, p1, p2, p3, t)
//         total += Math.hypot(p.x - prev.x, p.y - prev.y)
//         table.push({ t, length: total })
//         prev = p
//     }

//     return { table, totalLength: total }
// }

// function findTForDistance(
//     target: number,
//     table: { t: number; length: number }[]
// ) {
//     for (let i = 1; i < table.length; i++) {
//         if (table[i].length >= target) {
//             const prev = table[i - 1]
//             const curr = table[i]

//             const span = curr.length - prev.length
//             const ratio =
//                 (target - prev.length) / span

//             return prev.t + (curr.t - prev.t) * ratio
//         }
//     }
//     return 1
// }


// type CurvedPathProps = {
//     points: [Point, Point, Point, Point] // cubic bezier
//     dashCount?: number
// }


// export const PirateDashedPath = ({
//     points,
//     dashCount = 25
// }: CurvedPathProps) => {
//     const [p0, p1, p2, p3] = points

//     return (
//         <div className="absolute inset-0 pointer-events-none">
//             {Array.from({ length: dashCount }).map((_, i) => {
//                 const { table, totalLength } = buildArcTable(p0, p1, p2, p3)

//                 const spacing = totalLength / dashCount

//                 const distance = i * spacing
//                 const t = findTForDistance(distance, table)

//                 const pos = cubicBezier(p0, p1, p2, p3, t)
//                 const angle = angleOnCurve(p0, p1, p2, p3, t)

//                 return (
//                     <div>
//                         <motion.div
//                             key={i}
//                             style={{
//                                 position: "absolute",
//                                 x: `${pos.x * 1}vw`,
//                                 y: `${pos.y * 1}vh`,
//                                 width: 30,
//                                 height: 15,
//                                 background: "#683610",
//                                 borderRadius: 20,
//                                 rotate: angle
//                             }}
//                             initial={{ opacity: 0, scale: 0 }}
//                             whileInView={{ opacity: 1, scale: 1 }}
//                             viewport={{ once: true }}
//                             transition={{
//                                 duration: 0.25,
//                                 delay: i * 0.01
//                             }}
//                         />

//                     </div>
//                 )
//             })}
//             <motion.svg viewBox="0 0 400 400"
//                 style={{
//                     position: "absolute",
//                     x: `8vw`,
//                     y: `265vh`,
//                     width: 100,
//                     height: 100,


//                 }}>
//                 <motion.path

//                     d="M 70 90 C 130 120, 200 200, 330 330"
//                     stroke="#c40000"
//                     strokeWidth="64"
//                     strokeLinecap="round"
//                     strokeLinejoin="round"
//                     fill="none"
//                     initial={{ pathLength: 0 }}
//                     whileInView={{ pathLength: 1 }}
//                     viewport={{ once: true, amount: 0.5 }}
//                     transition={{ duration: 0.5, delay: 0.30, ease: "easeOut" }}

//                 />

//                 <motion.path
//                     d="M 330 80 C 260 140, 200 220, 80 330"
//                     stroke="#c40000"
//                     strokeWidth="64"
//                     strokeLinecap="round"
//                     strokeLinejoin="round"
//                     fill="none"
//                     initial={{ pathLength: 0 }}

//                     whileInView={{ pathLength: 1 }}
//                     viewport={{ once: true, amount: 0.5 }}
//                     transition={{ duration: 0.5, delay: 0.40, ease: "easeOut" }}
//                 />
//             </motion.svg>

//         </div>
//     )
// }

import { motion } from "framer-motion"
import { useEffect, useRef, useState } from "react"

type Dash = {
  x: number
  y: number
  angle: number
}

type PirateDashedPathProps = {
  d: string
  dashCount?: number
}

export function PirateDashedPath({
  d,
  dashCount = 20
}: PirateDashedPathProps) {

  const pathRef = useRef<SVGPathElement>(null)
  const [dashes, setDashes] = useState<Dash[]>([])

  useEffect(() => {
    const path = pathRef.current
    if (!path) return

    const length = path.getTotalLength()
    const spacing = length / dashCount
    // const nextDelta = 0.5

    const result: Dash[] = []

    for (let i = 0; i < dashCount; i++) {
    const dist = i * spacing

    const p = path.getPointAtLength(dist)

    const delta = 2

    const pPrev = path.getPointAtLength(
        Math.max(dist - delta, 0)
    )

    const pNext = path.getPointAtLength(
        Math.min(dist + delta, length)
    )

    const angle =
        Math.atan2(
        pNext.y - pPrev.y,
        pNext.x - pPrev.x
        ) * (180 / Math.PI)

    result.push({
        x: p.x,
        y: p.y,
        angle
    })
    }


    setDashes(result)
  }, [d, dashCount])

  return (
    <div
    className="
    z-[-10]
    absolute 
    left-1/2 
    top-0
    -translate-x-1/2
    w-[140vw] h-[140vw]
    md:w-[120vw] md:h-[120vw]
    pointer-events-none
  "
  style={{
    width: "120vw",
    height: "120vw",
    transform: "translate(0%, 10%)"
  }}
>

      <svg
        viewBox="0 0 400 400"
        preserveAspectRatio="xMidYMid meet"
        className="absolute left-1/2 top-1/2 w-[140vw] h-[140vw] md:w-[120vw] md:h-[120vw] -translate-x-1/2 -translate-y-1/2"

      >


        {/* Hidden measuring path */}
        <defs>
  <filter id="softBlur">
    <feGaussianBlur stdDeviation="1.5" />
  </filter>
</defs>

        <path
          ref={pathRef}
          d={d}
          fill="none"
          stroke="none"
        />

        {/* Visible popping dashes */}
        {dashes.map((dash, i) => (
          <motion.rect
          filter="url(#softBlur)"
            key={i}
            x={dash.x - 15}
            y={dash.y - 7}
            width={30}
            height={14}
            rx={7}
            fill="#251508"
            style={{
              rotate: dash.angle,
              transformBox: "fill-box",
              transformOrigin: "center"
            }}
            initial={{ scale: 0, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            viewport={{ once: false }}
            transition={{
              duration: 0.55,
              delay: i * 0.02
            }}
          />
        ))}
      </svg>
    </div>
  )
}
