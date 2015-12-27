Template.game.rendered = function(){
	var game = new Phaser.Game("100","100", Phaser.AUTO, 'game', {
		preload: preload,
		create: create,
		update:update });
	return game;
	
	function preload() {
		game.load.image('car', '/car.png');
		game.load.image('tinycar', '/tinycar.png');
		game.load.image('redSquare', '/redSquare25x25.png');
	}

	function create() {
	    game.physics.startSystem(Phaser.Physics.P2JS);

	    tinyCars = game.add.group();
		numberOfCars = 20;
	    for (var i = 0; i < numberOfCars; i++) {
			xPositionStep = game.width/numberOfCars;
			var tinyCar = tinyCars.create(xPositionStep*i, game.height/2, 'tinycar');
            //console.log(tinyCar);
            tinyCar.scale.setTo(0.1,0.1);
			game.physics.p2.enable(tinyCar,false);
	    }

	    cursors = game.input.keyboard.createCursorKeys();

		car = game.add.sprite(32, game.world.height - 150, 'car');
	    game.physics.p2.enable(car);

		square = game.add.sprite("25", "25", 'redSquare');
		game.physics.p2.enable(square);

		var won = false;
	}
	
	function update() {
		//Move tinyCars
	    tinyCars.forEachAlive(moveTinyCar,this);  //make tinyCars accelerate to car

		//Move car
	    if (cursors.left.isDown) {car.body.rotateLeft(100);}   //car movement
	    else if (cursors.right.isDown){car.body.rotateRight(100);}
	    else {car.body.setZeroRotation();}
	    if (cursors.up.isDown){car.body.thrust(400);}
	    else if (cursors.down.isDown){car.body.reverse(400);}

		//Move square with mouse or tab
		game.input.onDown.add(moveSquare, this);

		//Check for overlap
		bounds1 = car.getBounds();
		bounds2 = square.getBounds();

		//if (Phaser.Rectangle.intersects(bounds1, bounds2)) {
		//	if (won == false){
		//		won = true;
		//		alert("You won!!");
		//		game.destroy();
		//	}
        //
        //
		//}

		//Move square randonly
		square.body.rotateRight(game.rnd.between(0,180));
		square.body.thrust(game.rnd.between(0,10));
	}

	function moveSquare(pointer){
//		square.body.rotateLeft(25);
		accelerateToObject(square,pointer, 5000);
	}

	function moveTinyCar (tinyCar) {
	    accelerateToObject(tinyCar,square,150);  //start accelerateToObject on every bullet
	}


	function accelerateToObject(obj1, obj2, speed) {
	    if (typeof speed === 'undefined') { speed = 60; }
	    var angle = Math.atan2(obj2.y - obj1.y, obj2.x - obj1.x);
	    obj1.body.rotation = angle + game.math.degToRad(90);  // correct angle of angry tinyCars (depends on the sprite used)
	    obj1.body.force.x = Math.cos(angle) * speed;    // accelerateToObject
	    obj1.body.force.y = Math.sin(angle) * speed;
	}
};

