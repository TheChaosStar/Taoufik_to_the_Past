const canvas = document.querySelector('canvas');
const c = canvas.getContext('2d');
canvas.width = 250 ;
canvas.height = 250;
c.fillStyle = 'white';
c.fillRect(0, 0, canvas.width, canvas.height);

const collisionsMap = [];
for (let i = 0; i < collisions.length; i += 70) {
    collisionsMap.push(collisions.slice(i, 70 + i));
}

const nextZoneMap = [];
for (let i = 0; i < map1.length; i += 70) {
    nextZoneMap.push(map1.slice(i, 70 + i));
}

const boundaries = [];
const offset = {
    x: -975,
    y: -75
};

collisionsMap.forEach((row, i) => {
    row.forEach((symbol, j) => {
        if (symbol === 1025)
            boundaries.push(
                new Boundary({
                    position: {
                        x: j * Boundary.width + offset.x,
                        y: i * Boundary.height + offset.y
                    }
                })
            )
    })
});

const zones = [];

nextZoneMap.forEach((row, i) => {
    row.forEach((symbol, j) => {
        if (symbol === 1026)
            zones.push(
                new Boundary({
                    position: {
                        x: j * Boundary.width + offset.x,
                        y: i * Boundary.height + offset.y
                    }
                })
            )
    })
});

const level1 = new Image();
level1.src = './assets/img/Map1.png';

const foregroundImage = new Image();
foregroundImage.src = './assets/img/foregroundObjects.png';

const playerImage = new Image();
playerImage.src = './assets/img/PlayerSheet.png';

const player = new Sprite({
    position: {
        x: canvas.width / 2 - (69/2),
        y: canvas.height / 2 - (69/2)
    },
    image: playerImage,
    frames: { max: 9 }
});
const background = new Sprite({
    position: {
        x: offset.x,
        y: offset.y
    },
    image: level1
});
const foreground = new Sprite({
    position: {
        x: offset.x,
        y: offset.y
    },
    image: foregroundImage
});

const keys = {
    z: {
        pressed: false,
    },
    q: {
        pressed: false,
    },
    s: {
        pressed: false,
    },
    d: {
        pressed: false,
    },
};

const movables = [background, ...boundaries, foreground, ...zones];

function retangularCollision({ rectangle1, rectangle2 }) {
    return (
        rectangle1.position.x + rectangle1.width >= rectangle2.position.x &&
        rectangle1.position.x <= rectangle2.position.x + rectangle2.width &&
        rectangle1.position.y <= rectangle2.position.y + rectangle2.height &&
        rectangle1.position.y + rectangle1.height >= rectangle2.position.y
    );
};

function animate() {
    window.requestAnimationFrame(animate);
    background.draw();

    // boundaries.forEach((boundary) => {
    //     boundary.draw('rgba(255, 0, 0, 0.5)');
    // });

    // zones.forEach((zone) => {
    //     zone.draw('rgba(0, 0, 255, 0.5)');
    // });

    player.draw();

    let moving = true;
    player.moving = false;
    if (keys.z.pressed && lastkey === 'z') {
        player.moving = true;
        for (let i = 0; i < boundaries.length; i++) {
            const boundary = boundaries[i];
            if (retangularCollision({
                rectangle1: player,
                rectangle2: {
                    ...boundary,
                    position: {
                        x: boundary.position.x,
                        y: boundary.position.y + 3
                    }
                },
            })
            ) {
                moving = false;
                break;
            }
        }

        if (moving) {
            movables.forEach(movable => { movable.position.y += 3 });
            // if (background.position.y < 0) {
            // } else {
            //     movables.forEach(movable => { movable.position.x -= 3});
            // }
        }
    }
    else if (keys.s.pressed && lastkey === 's') {
        player.moving = true;
        for (let i = 0; i < boundaries.length; i++) {
            const boundary = boundaries[i];
            if (retangularCollision({
                rectangle1: player,
                rectangle2: {
                    ...boundary,
                    position: {
                        x: boundary.position.x,
                        y: boundary.position.y - 3
                    }
                },
            })
            ) {
                moving = false;
                break;
            }
        }

        if (moving)
            movables.forEach(movable => { movable.position.y -= 3 });
    }
    if (keys.d.pressed && lastkey === 'd') {
        player.moving = true;
        for (let i = 0; i < boundaries.length; i++) {
            const boundary = boundaries[i];
            if (retangularCollision({
                rectangle1: player,
                rectangle2: {
                    ...boundary,
                    position: {
                        x: boundary.position.x - 3,
                        y: boundary.position.y
                    }
                },
            })
            ) {
                moving = false;
                break;
            }
        }

        if (moving)
            movables.forEach(movable => { movable.position.x -= 3 });
    }
    else if (keys.q.pressed && lastkey === 'q') {
        player.moving = true;
        for (let i = 0; i < boundaries.length; i++) {
            const boundary = boundaries[i];
            if (retangularCollision({
                rectangle1: player,
                rectangle2: {
                    ...boundary,
                    position: {
                        x: boundary.position.x + 3,
                        y: boundary.position.y
                    }
                },
            })
            ) {
                moving = false;
                break;
            }
        }

        if (moving)
            movables.forEach(movable => { movable.position.x += 3 });
    }


    foreground.draw();

};

animate();

let lastkey = '';

// Keys Down
window.addEventListener('keydown', (e) => {
    switch (e.key) {
        case 'z':
            keys.z.pressed = true;
            lastkey = 'z';
            break;

        case 'q':
            keys.q.pressed = true;
            lastkey = 'q';
            break;

        case 's':
            keys.s.pressed = true;
            lastkey = 's';
            break;

        case 'd':
            keys.d.pressed = true;
            lastkey = 'd';
            break;


        default:
            break;

    }
});


// Keys up
window.addEventListener('keyup', (e) => {
    switch (e.key) {
        case 'z':
            keys.z.pressed = false;
            break;

        case 'q':
            keys.q.pressed = false;
            break;

        case 's':
            keys.s.pressed = false;
            break;

        case 'd':
            keys.d.pressed = false;
            break;


        default:
            break;

    }
});