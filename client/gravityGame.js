/**
 * Created by cmt on 12/26/15.
 */
Template.gravity.rendered = function() {
    var game = new Phaser.Game("100", "100", Phaser.CANVAS, 'gravity',
        {preload: preload, create: create, update: update, render: render});
    return game;

    function preload() {
        //game.load.image('arrow', 'assets/sprites/xenon2_ship.png');
        game.load.image('redSquare', '/redSquare25x25.png');

    }

    var sprite;
    var bmd;

    function create() {

        //	Enable p2 physics
        game.physics.startSystem(Phaser.Physics.P2JS);

        game.stage.backgroundColor = 'blue';

        bmd = game.add.bitmapData(800, 600);
        //bmd.context.fillStyle = '#ffffff';

        //var bg = game.add.sprite(0, 0, bmd);

        game.physics.p2.gravity.y = 100;
        game.physics.p2.restitution = 0.8;

        sprite = game.add.sprite(32, 450, 'redSquare');

        game.physics.p2.enable(sprite);

        sprite.body.fixedRotation = true;

        //text = game.add.text(20, 20, 'click to the left / right of the ship', {fill: '#ffffff', font: '14pt Arial'});

        game.input.onDown.add(launch, this);

    }

    function launch() {

        if (game.input.x < sprite.x) {
            sprite.body.velocity.x = -200;
            sprite.body.velocity.y = 200;
        }
        else {
            sprite.body.velocity.x = 200;
            sprite.body.velocity.y = -200;
        }

    }

    function update() {

        //bmd.context.fillStyle = '#ffff00';
        bmd.context.fillRect(sprite.x, sprite.y, 2, 2);

    }

    function render() {
    }
};