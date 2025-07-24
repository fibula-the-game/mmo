const mockPlayers = [
    { username: "DeathKnight99", class: "Bone Knight", icon: "🦴", level: 67 },
    { username: "xXNecroMageXx", class: "Skull Mage", icon: "💀", level: 82 },
    { username: "SkellyBoi420", class: "Rib Ranger", icon: "🏹", level: 45 },
    { username: "BoneCollector", class: "Spine Assassin", icon: "⚡", level: 91 },
    { username: "GraveDigger23", class: "Bone Knight", icon: "🦴", level: 58 },
    { username: "UndeadLegend", class: "Skull Mage", icon: "💀", level: 73 },
    { username: "ArrowToTheKnee", class: "Rib Ranger", icon: "🏹", level: 62 },
    { username: "ShadowStrike", class: "Spine Assassin", icon: "⚡", level: 88 },
    { username: "CalciumDefender", class: "Bone Knight", icon: "🦴", level: 54 },
    { username: "MagicMarrow", class: "Skull Mage", icon: "💀", level: 69 },
    { username: "QuiverBones", class: "Rib Ranger", icon: "🏹", level: 77 },
    { username: "PhantomBlade", class: "Spine Assassin", icon: "⚡", level: 95 }
];

function getRandomPlayers(count = 4) {
    const shuffled = [...mockPlayers].sort(() => 0.5 - Math.random());
    return shuffled.slice(0, count);
}

function renderPlayerSpotlight() {
    const container = document.querySelector('.character-preview');
    if (!container) return;
    
    const players = getRandomPlayers();
    
    container.innerHTML = players.map(player => `
        <div class="character-slot">
            <div class="character-model">${player.icon}</div>
            <div class="character-info">
                <h3>${player.username}</h3>
                <p class="player-class">${player.class}</p>
                <p>Level ${player.level}</p>
            </div>
        </div>
    `).join('');
}

function rotateSpotlight() {
    const container = document.querySelector('.character-preview');
    if (!container) return;
    
    container.style.opacity = '0';
    
    setTimeout(() => {
        renderPlayerSpotlight();
        container.style.opacity = '1';
    }, 300);
}

document.addEventListener('DOMContentLoaded', () => {
    renderPlayerSpotlight();
    
    setInterval(rotateSpotlight, 10000);
});