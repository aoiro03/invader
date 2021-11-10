//画像
let IMG = {}
IMG['Title']=new Image()
IMG['Title'].src='img/Ew_S-hTVoAE0Xlr.png'
IMG['Player'] = new Image()
IMG['Player'].src = 'img/player.png'
IMG['Shot'] = new Image()
IMG['Shot'].src = 'img/shot.png'
IMG['Enemy'] = new Image()
IMG['Enemy'].src = 'img/enemy.png'
IMG['EnemyShot'] = new Image()
IMG['EnemyShot'].src = 'img/enemyShot.png'

let scene = 'TITLE'
//プレイヤーの変数
let playerX = 0, playerY = HEIGHT - 16, playerW = 24, playerH = 16, playerV = 2
//敵の変数
let enemyX = 0, enemyY = 0, enemyV = 2, enemyW = 24, enemyH = 16, enemyVY = 16
let enemyAlive = true
let enemyCount = 100
//プレイヤーの弾の変数
let shotX = 0, shotY = -100, shotV = -5, shotW = 8, shotH = 16
//敵の弾の変数
let enemyShotW = 8, enemyShotH = 16, enemyShotX = 0, enemyShotY = HEIGHT + 100, enemyShotV = 5
//障害物の変数
let wallX = 270, wallY = 190, wallW = 32, wallHP = 4

function main() {
    if (scene === 'TITLE') {
        title()
    }
    if (scene === 'GAME') {
        game()
    }
    if (scene === 'GAME CLEAR') {
        gameclear()
    }
    if (scene === 'GAME OVER') {
        gameover()
    }
}
function reset() {
    //プレイヤーの変数
    playerX = 0, playerY = HEIGHT - 16
    //敵の変数
    enemyX = 0, enemyY = 0
    enemyAlive = true
    enemyCount = 300
    //プレイヤーの弾の変数
    shotX = 0, shotY = -100
    //敵の弾の変数
    enemyShotX = 0, enemyShotY = HEIGHT + 100
    //障害物の変数
    wallHP = 4
}
//タイトル
function title() {
    ctx.clearRect(0, 0, WIDTH, HEIGHT)
    ctx.fillStyle = 'black'
    ctx.fillRect(0, 0, WIDTH, HEIGHT)
    ctx.drawImage(IMG['Title'],0,0)
    ctx.fillStyle = 'white'
    ctx.fillText('Press Enter to start', WIDTH / 2, HEIGHT /2 +50)
    if (enterKey()) {
            scene = 'GAME'
    }
}
//ゲーム
function game() {
    //画面リセット
    ctx.clearRect(0, 0, WIDTH, HEIGHT)
    ctx.fillStyle = 'black'
    ctx.fillRect(0, 0, WIDTH, HEIGHT)
    //プレイヤー描画
    ctx.drawImage(IMG['Player'], playerX, playerY)
    //敵描画
    if (enemyAlive) {
        ctx.drawImage(IMG['Enemy'], enemyX, enemyY)
    }
    //プレイヤー弾描画
    ctx.drawImage(IMG['Shot'], shotX, shotY)
    //敵弾描画
    ctx.drawImage(IMG['EnemyShot'], enemyShotX, enemyShotY)
    //障害物描画
    ctx.fillStyle = 'green'
    ctx.fillRect(wallX, wallY, wallW, wallHP * 4)
    //敵の弾の発射
    enemyCount -= 1
    if (enemyCount === 0) {
        enemyCount = 100
        enemyShotX = enemyX + enemyW / 2 - enemyShotW / 2
        enemyShotY = enemyY
    }
    enemyShotY += enemyShotV
    //敵の動き
    if (enemyAlive) {
        enemyX += enemyV
        if (enemyX > WIDTH - enemyW) {
            enemyY += enemyVY
            enemyV *= -1
        }
        if (enemyX < 0) {
            enemyY += enemyVY
            enemyV *= -1
        }
    }
    //敵とプレイヤーの弾の当たり判定
    if (enemyX < shotX + shotW && shotX < enemyX + enemyW) {
        if (enemyY < shotY + shotH && shotY < enemyY + enemyH) {
            enemyAlive = false
            shotY = -100
            scene = 'GAME CLEAR'
        }
    }
    //プレイヤーと敵の弾の当たり判定
    if (playerX < enemyShotX + enemyShotW && enemyShotX < playerX + playerW) {
        if (playerY < enemyShotY + enemyShotH && enemyShotY < playerY + playerH) {
            scene = 'GAME OVER'
        }
    }
    //障害物とプレイヤーの弾の当たり判定
    if (wallHP > 0) {
        if (wallX < shotX + shotW && shotX < wallX + wallW) {
            if (wallY < shotY + shotH && shotY < wallY + wallHP * 4) {
                shotY = -100
                wallHP -= 1
            }
        }
        if (wallX < enemyShotX + enemyShotW && enemyShotX < wallX + wallW) {
            if (wallY < enemyShotY + enemyShotH && enemyShotY < wallY + wallHP * 4) {
                enemyShotY = HEIGHT + 100
                wallHP -= 1
            }
        }
    }
    //プレイヤー操作
    if (rightKey()) {
        playerX += playerV
    }
    if (leftKey()) {
        playerX -= playerV
    }
    if (playerX < 0) {
        playerX = 0
    }
    if (playerX > WIDTH - playerW) {
        playerX = WIDTH - playerW
    }
    //プレイヤー弾発射
    if (shotY + shotH < 0) {
        if (spaceKey()) {
            shotX = playerX + playerW / 2 - shotW / 2
            shotY = playerY
        }
    }
    shotY += shotV
}
//ゲームクリア
function gameclear() {
    ctx.clearRect(0, 0, WIDTH, HEIGHT)
    ctx.fillStyle = 'black'
    ctx.fillRect(0, 0, WIDTH, HEIGHT)
    ctx.fillStyle = 'white'
    ctx.fillText('GAME CLEAR!', WIDTH / 2, HEIGHT / 2)
    ctx.fillText('Press space to return to the title',WIDTH/2,HEIGHT/2+30)
    if (spaceKey()) {
        reset()
        scene = 'TITLE'
    }
}
//ゲームオーバー
function gameover() {
    ctx.clearRect(0, 0, WIDTH, HEIGHT)
    ctx.fillStyle = 'black'
    ctx.fillRect(0, 0, WIDTH, HEIGHT)
    ctx.fillStyle = 'white'
    ctx.fillText('GAME OVER><', WIDTH / 2, HEIGHT / 2)
    ctx.fillText('Press R to restert',WIDTH/2,HEIGHT/2+30)
    ctx.fillText('Press space to return to the title',WIDTH/2,HEIGHT/2+40)
    if (spaceKey()) {
        reset()
        scene = 'TITLE'
    }
    if (rKey()) {
        reset()
        scene = 'GAME'
    }
}
