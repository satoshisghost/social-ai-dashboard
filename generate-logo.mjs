// Run with: node generate-logo.mjs
import { createCanvas } from 'canvas'
import { writeFileSync } from 'fs'

const SIZE = 512
const canvas = createCanvas(SIZE, SIZE)
const ctx = canvas.getContext('2d')

// Rounded rect background
const radius = 110
ctx.beginPath()
ctx.moveTo(radius, 0)
ctx.lineTo(SIZE - radius, 0)
ctx.quadraticCurveTo(SIZE, 0, SIZE, radius)
ctx.lineTo(SIZE, SIZE - radius)
ctx.quadraticCurveTo(SIZE, SIZE, SIZE - radius, SIZE)
ctx.lineTo(radius, SIZE)
ctx.quadraticCurveTo(0, SIZE, 0, SIZE - radius)
ctx.lineTo(0, radius)
ctx.quadraticCurveTo(0, 0, radius, 0)
ctx.closePath()

// Gradient fill
const grad = ctx.createLinearGradient(0, 0, SIZE, SIZE)
grad.addColorStop(0, '#a855f7')
grad.addColorStop(1, '#3b82f6')
ctx.fillStyle = grad
ctx.fill()

// Lightning bolt
ctx.beginPath()
ctx.moveTo(292, 72)
ctx.lineTo(174, 266)
ctx.lineTo(246, 266)
ctx.lineTo(220, 440)
ctx.lineTo(338, 246)
ctx.lineTo(266, 246)
ctx.closePath()
ctx.fillStyle = 'rgba(255,255,255,0.95)'
ctx.fill()

const buffer = canvas.toBuffer('image/png')
writeFileSync('public/logo-512.png', buffer)
console.log('Done! public/logo-512.png created')
