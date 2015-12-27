/**
 * Created by cmt on 12/27/15.
 */
Template.emitterCollideCallback.rendered = function() {
    var game = new Phaser.Game(800, 600, Phaser.AUTO, 'emitterCollideCallback', {
        preload: preload,
        create: create,
        update: update
    });
    return game;

    var leftEmitter;
    var ball;

    function preload() {
        game.load.spritesheet('balls', 'redSquare25x25.png', 17, 17);
        game.load.spritesheet('bubble', 'bubble.png', 17, 17);
    }

    function create() {
        leftEmitter = game.add.emitter(50, game.world.centerY - 200);
        leftEmitter.bounce.setTo(0.5, 0.5);
        leftEmitter.setXSpeed(100, 200);
        leftEmitter.setYSpeed(-50, 50);
        leftEmitter.makeParticles('balls', 0, 1000, 1, true);

        ball = game.add.sprite(100, 100, "bubble", 2);
        ball.scale.x = 5;
        ball.scale.y = 5;
        game.physics.enable(ball, Phaser.Physics.ARCADE);

        leftEmitter.start(false, 5000, 20);
    }


    function update() {
        game.physics.arcade.collide(ball, leftEmitter, change, null, this);
    }

    function change(a, b) {
        a.frame = 3;
        b.frame = 3;
    }
}
