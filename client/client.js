Template.game1.helpers({
    phaserGame: function() {
	var game = new Phaser.Game(320,320, Phaser.AUTO, 'firstGame', { preload: preload, create: create, update:update }); 
	return game;
	
	function preload() {
		game.load.image('car', '/car.png');
		game.load.image('tinycar', '/tinycar.png');
		game.load.image('redSquare', '/redSquare25x25.png');
	}
	function create() {
	    game.physics.startSystem(Phaser.Physics.P2JS);

	    tinyCars = game.add.group();
	    for (var i = 0; i < 5; i++) {
			var tinyCar = tinyCars.create(game.rnd.integerInRange(200, 1700), game.rnd.integerInRange(-200, 400), 'tinycar');
			game.physics.p2.enable(tinyCar,false);
	    }

	    cursors = game.input.keyboard.createCursorKeys();

		car = game.add.sprite(32, game.world.height - 150, 'car');
	    game.physics.p2.enable(car);

		square = game.add.sprite("25", "25", 'redSquare');
		game.physics.p2.enable(square);
	}
	
	function update() {
	    tinyCars.forEachAlive(moveTinyCar,this);  //make tinyCars accelerate to car
	    
	    if (cursors.left.isDown) {car.body.rotateLeft(100);}   //car movement
	    else if (cursors.right.isDown){car.body.rotateRight(100);}
	    else {car.body.setZeroRotation();}
	    if (cursors.up.isDown){car.body.thrust(400);}
	    else if (cursors.down.isDown){car.body.reverse(400);}

		game.input.onDown.add(moveSquare, this);

/*		if (game.input.pointer1.isDown){
			if (Math.floor(game.input.x/(game.width/2)) === LEFT) {
				square.body.velocity.x = 150;
//				player.animations.play('right');
			}

			if (Math.floor(game.input.x/(game.width/2)) === RIGHT) {
				square.body.velocity.x = -150;
//				player.animations.play('left');
			}
		}else{
			//  Stand still
			square.animations.stop();
		}
		square.body.rotateLeft(10);
*/
	}
		function moveSquare(pointer){
//			square.body.rotateLeft(25);
			accelerateToObject(square,pointer, 1000);
		}
	function moveTinyCar (tinyCar) {
	    accelerateToObject(tinyCar,car,30);  //start accelerateToObject on every bullet
	}


	function accelerateToObject(obj1, obj2, speed) {
	    if (typeof speed === 'undefined') { speed = 60; }
	    var angle = Math.atan2(obj2.y - obj1.y, obj2.x - obj1.x);
	    obj1.body.rotation = angle + game.math.degToRad(90);  // correct angle of angry tinyCars (depends on the sprite used)
	    obj1.body.force.x = Math.cos(angle) * speed;    // accelerateToObject 
	    obj1.body.force.y = Math.sin(angle) * speed;
	}
    }
})