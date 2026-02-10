# 🐸 Frog vs Flies - 2D Canvas Game

A fun and challenging 2D browser-based game where you control a frog defending itself against attacking flies. Shoot them down before they catch you!

![Game Screenshot](https://img.shields.io/badge/HTML5-Canvas-orange) ![JavaScript](https://img.shields.io/badge/JavaScript-ES6-yellow) ![CSS3](https://img.shields.io/badge/CSS3-Styling-blue)

## 🎮 Game Overview

In this action-packed game, you play as a brave frog facing waves of aggressive flies. Use your quick reflexes to dodge and shoot down the flies before they overwhelm you. As you progress, the game becomes increasingly challenging with more flies and faster movement.

## ✨ Features

- **Smooth Controls**: Responsive keyboard controls for fluid movement
- **Progressive Difficulty**: Game difficulty increases with each level
- **AI Enemies**: Flies intelligently chase the player using pathfinding
- **Score System**: Earn points for each fly eliminated
- **Lives System**: Start with 3 lives and try to survive as long as possible
- **Level Progression**: Automatic difficulty scaling based on score
- **Animated Graphics**: Custom-drawn frog and fly sprites with animations
- **Game Over Screen**: Final score display with restart option
- **Beautiful UI**: Gradient backgrounds and modern interface design

## 🕹️ How to Play

### Controls

| Key | Action |
|-----|--------|
| **Arrow Keys** or **WASD** | Move the frog in 4 directions |
| **Space** | Shoot projectiles at flies |

### Gameplay

1. **Objective**: Eliminate flies by shooting them while avoiding contact
2. **Scoring**: Earn 10 points for each fly destroyed
3. **Lives**: You have 3 lives. Lose one when a fly touches you
4. **Level Up**: Progress to higher levels every 50 points
5. **Survival**: The game ends when all lives are lost

### Tips & Strategies

- 🎯 Keep moving to avoid getting cornered by multiple flies
- 🔫 Aim carefully - bullets travel straight upward
- 📍 Position yourself strategically to line up multiple targets
- ⚡ Higher levels spawn more flies with increased speed
- 🛡️ Preserve your lives for later levels when difficulty increases

## 🚀 Getting Started

### Prerequisites

- Any modern web browser (Chrome, Firefox, Safari, Edge)
- No additional installations required!

### Installation

1. Clone or download this repository:
```bash
git clone <repository-url>
cd Game
```

2. Open `index.html` in your web browser:
```bash
# On Windows
start index.html

# On macOS
open index.html

# On Linux
xdg-open index.html
```

Alternatively, simply double-click the `index.html` file.

### Playing Online

You can also host this game on any static web server or use services like:
- GitHub Pages
- Netlify
- Vercel
- Any local web server

## 📁 Project Structure

```
Game/
│
├── index.html          # Main HTML file with game canvas
├── README.md           # This file
│
└── static/
    ├── scripts.js      # Game logic and mechanics
    └── style.css       # Styling and layout
```

## 🎨 Technical Details

### Technologies Used

- **HTML5 Canvas**: For rendering game graphics
- **Vanilla JavaScript**: Game logic and mechanics (ES6+)
- **CSS3**: Styling with gradients and animations

### Key Features Implementation

- **Collision Detection**: AABB (Axis-Aligned Bounding Box) algorithm
- **AI Pathfinding**: Vector-based movement toward player position
- **Animation Loop**: RequestAnimationFrame for smooth 60 FPS gameplay
- **Event Handling**: Keyboard input with simultaneous key press support
- **Dynamic Spawning**: Adaptive enemy generation based on level

### Game Mechanics

```javascript
// Scoring
+10 points per fly eliminated

// Level Progression
Level = floor(Score / 50)

// Fly Speed
Base Speed: 1.5
Speed Increase: +0.2 per level

// Spawn Rate
Flies on Screen: 2 + current level
```

## 🎯 Future Enhancements

Potential features for future versions:

- [ ] Power-ups (rapid fire, shield, speed boost)
- [ ] Multiple weapon types
- [ ] Different enemy types with unique behaviors
- [ ] Sound effects and background music
- [ ] High score leaderboard (localStorage)
- [ ] Mobile touch controls
- [ ] Pause functionality
- [ ] Boss battles at certain levels
- [ ] Particle effects for hits/explosions
- [ ] Day/night cycle background

## 🐛 Known Issues

- None currently reported

## 🤝 Contributing

Contributions, issues, and feature requests are welcome!

1. Fork the project
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📝 License

This project is free to use for educational and personal purposes.

## 🙏 Acknowledgments

- Inspired by classic arcade shooter games
- Built with ❤️ using HTML5 Canvas API

## 📧 Contact

For questions or suggestions, please open an issue on the repository.

---

**Enjoy the game and happy hunting! 🐸🎯**
