(function(){
	var WIDTH = 1920;
	var HEIGHT = 1080;
	//increase bullet capacity when you hit a heart
	//Organ COllector NOW IN 1080P
	var _game = new Phaser.Game(WIDTH, HEIGHT, Phaser.AUTO, 'game');

	var mainState = {
		preload : function(){
			this.game.load.image('bullet','assets/bullet.png');
			this.game.load.image('bgSpace','assets/background.png');
			this.game.load.image('bgSpace2','assets/starfield.png');
			this.game.load.spritesheet('ship','assets/doctor.gif',96,141,1);
			"64,29,4"
			this.game.load.spritesheet("enemyship1","assets/intestine.png",57, 57, 1);
			this.game.load.spritesheet("enemyship2","assets/pancreas.png",57, 48, 1);
			this.game.load.spritesheet("enemyship3","assets/liver.png",50, 33, 1);
			this.game.load.spritesheet("enemyship4","assets/kidney.png",50, 47, 1);
			this.game.load.spritesheet("enemyship5","assets/lung.png",75, 56, 1);
			this.game.load.spritesheet("fake1","assets/lung1.png",75, 56, 1);
			this.game.load.spritesheet("fake2","assets/kidney1.png",50, 47, 1);
			this.game.load.spritesheet("fake3","assets/liver1.png",50, 33, 1);
			this.game.load.spritesheet("fake4","assets/pancreas1.png",57, 48, 1);
			this.game.load.spritesheet("fake5","assets/intestine1.png",57, 57, 1);
			this.game.load.spritesheet("patient1","assets/patient.png",90, 134, 1);
			this.game.load.spritesheet("patient2","assets/patient1.png",90, 134, 1);
			this.game.load.spritesheet("patient3","assets/patient2.png",90, 134, 1);
			this.game.load.spritesheet("patient4","assets/patient3.png",90, 134, 1);
			this.game.load.spritesheet("patient5","assets/patient4.png",90, 134, 1);
			this.game.load.spritesheet("gaben1","assets/gaben1.png",100, 55, 1);
			this.game.load.spritesheet("gaben2","assets/gaben2.png",100, 55, 1);
			this.game.load.spritesheet("patientcpy1","assets/patientcopy.png",90, 134, 1);
			this.game.load.spritesheet("patientcpy2","assets/patientcopy1.png",90, 134, 1);
			this.game.load.spritesheet("patientcpy3","assets/patientcopy2.png",90, 134, 1);
			this.game.load.spritesheet("patientcpy4","assets/patientcopy3.png",90, 134, 1);
			this.game.load.spritesheet("patientcpy5","assets/patientcopy4.png",90, 134, 1);
			this.game.load.audio('gaben', 'assets/Untitled1.mp3');
			this.game.load.audio('ouch', 'assets/ouch1.mp3');
			this.game.load.audio('got', 'assets/gotitfaris.mp3');
		},
		create1: function () {
			// Create a custom timer
			this.timer = this.game.time.create1();
			
			// Create a delayed event 1m and 30s from now
			this.timerEvent = this.timer.add(Phaser.Timer.MINUTE * 1 + Phaser.Timer.SECOND * 30, this.endTimer, this);
			
			// Start the timer
			this.timer.start();
		},
		create : function(){
			this.lastBullet = 0;
			this.lastEnemy = 0;
			this.lastPatient = 0;
			this.lastPatientDead = 0;
			this.lastFake = 0;
			this.lastGaben = 0;
			this.lastTick = 0;
			this.speed = 240;
			this.bg1Speed = 30;
			this.bg2Speed =40;
			this.bg3Speed =50;
			this.enemySpeed = 200;
			this.patientSpeed = 230;
			this.gabenSpeed = 175;
			this.patientsDeadSpeed = 245;
			this.fakeSpeed = 245;
			this.bulletSpeed = 300;
			this.lives = 0;
			this.score = 0;
			this.numBullets = 100;
			this.numOrgans = 0;
			
			this.numFakes = 0;
			this.numPatientsDead = 0;
			this.numDonated = 0;
			this.numPatientsTransferred  =0;
			this.game.physics.startSystem(Phaser.Physics.ARCADE);

			this.bg = this.game.add.tileSprite(0,0,1920,1080,'bgSpace');
			this.bg.autoScroll(-this.bg1Speed,0);

			this.bg2 = this.game.add.tileSprite(0,0,1920,1080,'bgSpace2');
			this.bg2.autoScroll(-this.bg2Speed,0);

			this.bg3 = this.game.add.tileSprite(0,0,1920,1080,'bgSpace2');
			this.bg3.autoScroll(-this.bg3Speed,0);
			this.music = this.game.add.audio('gaben');
			//this.music.loop = true;
			//this.music.play();
			this.music1 = this.game.add.audio('ouch');
			this.music2 = this.game.add.audio('got');
			this.numGabens = 0;
			// Create a custom timer
			this.timer = this.game.time.create();
			
			// Create a delayed event 1m and 30s from now
			this.timerEvent = this.timer.add(Phaser.Timer.MINUTE * 2 + Phaser.Timer.SECOND * 30, this.endTimer, this);
			
			// Start the timer
			this.timer.start();
			this.bullets = this.game.add.group();
			this.bullets.enableBody = true;
			this.bullets.physicsBodyType = Phaser.Physics.ARCADE;
			this.bullets.createMultiple(10,'bullet');		
            //this.numBullets = 100;			
    		this.bullets.setAll('outOfBoundsKill', true);
    		this.bullets.setAll('checkWorldBounds', true);

			this.enemies = this.game.add.group();
			this.enemies.enableBody = true;
			this.enemies.physicsBodyType = Phaser.Physics.ARCADE;
			
			this.patients = this.game.add.group();
			this.patients.enableBody = true;
			this.patients.physicsBodyType = Phaser.Physics.ARCADE;
			
			this.fakes = this.game.add.group();
			this.fakes.enableBody = true;
			this.fakes.physicsBodyType = Phaser.Physics.ARCADE;
			
			this.patientsDead = this.game.add.group();
			this.patientsDead.enableBody = true;
			this.patientsDead.physicsBodyType = Phaser.Physics.ARCADE;
			
			this.gabens = this.game.add.group();
			this.gabens.enableBody = true;
			this.gabens.physicsBodyType = Phaser.Physics.ARCADE;
			var style = { font: "28px Arial", fill: "#DE5F3D", align: "left" };
			this.scoreText = this.game.add.text(0,0,"Score : "+this.score,style);
			//this.livesText = this.game.add.text(0,28,"Balloons hit by car : "+this.lives,style);
			//this.bulletsText = this.game.add.text(0,56,"Bullets : "+this.numBullets, style);
			this.numDonatedText = this.game.add.text(0,28,"Organs donated : "+this.numDonated, style);
			this.numOrgansText = this.game.add.text(0, 56,"Organs collected : "+this.numOrgans, style);
			this.numPatientsText = this.game.add.text(0,84,this.numPatientsTransferred+" patients transferred to hospital for organ transplant",style);
			this.numGabensText = this.game.add.text(0,168, "How many Gabens did you stop: "+this.numGabens, style);
			//this.numPatientsadText = this.game.add.text(0,112,"Patient #"+this.lastPatient+" transferred to hospital for organ transplant",style);
			this.numFakesText = this.game.add.text(0, 112,"Fakes collected : "+this.numFakes, style);
			this.numPatientsDeadText = this.game.add.text(0, 140,"Dead patients passed : "+this.numPatientsDead, style);
			this.sprite = this.game.add.sprite(this.game.world.centerX, this.game.world.centerY, 'ship');
			this.sprite.anchor.set(0.5);
			//  And enable the Sprite to have a physics body:
			this.game.physics.arcade.enable(this.sprite);
			this.EKey = this.game.input.keyboard.addKey(Phaser.Keyboard.E);
			this.HKey = this.game.input.keyboard.addKey(Phaser.Keyboard.H);
			//this.spaceKey = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);

		},
		render: function () {
			// If our timer is running, show the time in a nicely formatted way, else show 'Done!'
			//
			var style = { font: "28px Arial", fill: "#DE5F3D", align: "left" };
			if (this.timer.running) {
				this.game.debug.text(this.formatTime(Math.round((this.timerEvent.delay - this.timer.ms) / 1000)), 960, 20,  "#ff0");
			}
			else {
				//
				this.game.debug.text("Game Over and Click Refresh to Play Again!", 960, 20, "#0f0");
				this.game.debug.text("The score you have is " +this.score, 960, 40, "#0f0");

				this.game.state.start('menu');
				
			}
		},
		//borrowed timer code from http://jsfiddle.net/lewster32/vd70o41p/
		//but had to modify the code somewhat so that my game could run 
		endTimer: function() {
			// Stop the timer when the delayed event triggers
			this.timer.stop();
		},
		formatTime: function(s) {
			// Convert seconds (s) to a nicely formatted and padded time string
			var minutes = "0" + Math.floor(s / 60);
			var seconds = "0" + (s - minutes * 60);
			return minutes.substr(-2) + ":" + seconds.substr(-2);   
			},
		update : function(){
			this.sprite.body.velocity.setTo(0,0);
			if(this.game.input.keyboard.isDown(Phaser.Keyboard.LEFT) && this.sprite.x > 0)
			{
				this.sprite.body.velocity.x = -2*this.speed;
			}
			//else if(this.game.input.keyboard.isDown(Phaser.Keyboard.RIGHT) && this.sprite.x < (WIDTH-this.sprite.width))
			else if(this.game.input.keyboard.isDown(Phaser.Keyboard.RIGHT) && this.sprite.x < (WIDTH-1620))
			{
				this.sprite.body.velocity.x = this.speed;
			}
			else if(this.game.input.keyboard.isDown(Phaser.Keyboard.UP) && this.sprite.y > 0)
			{
				this.sprite.body.velocity.y = -this.speed;
			}
			//else if(this.game.input.keyboard.isDown(Phaser.Keyboard.DOWN) && this.sprite.y < (HEIGHT-this.sprite.height))
			else if(this.game.input.keyboard.isDown(Phaser.Keyboard.DOWN) && this.sprite.y < (HEIGHT))
			{
				this.sprite.body.velocity.y = +this.speed;
			}
			//  If the sprite is > 8px away from the pointer then let's move to it
			//if (this.game.physics.arcade.distanceToPointer(this.sprite, this.game.input.activePointer) > 8)
			//{
			//  Make the object seek to the active pointer (mouse or touch).
			//this.game.physics.arcade.moveToPointer(this.sprite, 800);
			//}
			else
			{
			//  Otherwise turn off velocity because we're close enough to the pointer
			this.sprite.body.velocity.set(0);
			}
			

			var curTime = this.game.time.now;

			if(this.game.input.keyboard.isDown(Phaser.Keyboard.SPACEBAR))
			{
				if(curTime - this.lastBullet > this.rnd.integerInRange(145,300))
				{
					this.fireBullet();
					//this.numBullets--;
					//this.bulletsText.setText = ("Bullets : "+this.numBullets);
					this.lastBullet = curTime;
				}
			}
			//put 500 here just in case 
			//I have been changing numbers around:::::
			if(curTime - this.lastEnemy > this.rnd.integerInRange(400,600))
			{
				this.generateEnemy();
				this.lastEnemy = curTime;
			}

			if(curTime - this.lastPatient > this.rnd.integerInRange(600,700))
			{
				this.generatePatients();
				this.lastPatient = curTime;
			}
			if(curTime - this.lastFake > this.rnd.integerInRange(880,900))
			{
				this.generateFake();
				this.lastFake = curTime;
			}
			if(curTime - this.lastPatientDead > this.rnd.integerInRange(750,1000))
			{
				this.generatePatientsDead();
				this.lastPatientDead = curTime;
			}
			//I had it to 500 and 600 and made the game way too hard
			//I have it to 800 and 1400 and made the game of medium difficulty
			//if(this.EKey.justPressed(250)){
			if(this.game.input.keyboard.isDown(Phaser.Keyboard.E)){
				//this.game.debug.text("The game is on Easy Mode ", 960, 60, { font: "30px Arial"} );
				if(curTime - this.lastGaben > this.rnd.integerInRange(1100,1400))
				{
					this.generateGabens();
					this.lastGaben = curTime;
				}
				if(curTime - this.lastEnemy > this.rnd.integerInRange(275,300))
				{
					this.generateEnemy();
					this.lastEnemy = curTime;
				}
				if(curTime - this.lastFake > this.rnd.integerInRange(1400,1500))
				{
					this.generateFake();
					this.lastFake = curTime;
				}
			}
			
			else if(this.game.input.keyboard.isDown(Phaser.Keyboard.H)){
				//this.game.debug.text("The game is on Hard Mode ", 960, 60, { font: "30px Arial"} );
				if(curTime - this.lastGaben > this.rnd.integerInRange(275,300))
				{
					this.generateGabens();
					this.lastGaben = curTime;
				}
				if(curTime - this.lastEnemy > this.rnd.integerInRange(800,1000))
				{
					this.generateEnemy();
					this.lastEnemy = curTime;
				}
				if(curTime - this.lastFake > this.rnd.integerInRange(300,400))
				{
					this.generateFake();
					this.lastFake = curTime;
				}
			}
			else{
				//this.game.debug.text("The game is on Normal Mode ", 960, 60, { font: "30px Arial"} );
				if(curTime - this.lastGaben > this.rnd.integerInRange(500,1400))
				{
					this.generateGabens();
					this.lastGaben = curTime;
				}
			}
			this.game.physics.arcade.collide(this.enemies, this.sprite, this.enemyHitPlayer, null, this);
			this.game.physics.arcade.collide(this.enemies, this.bullets, this.enemyHitBullet,null, this);
			this.game.physics.arcade.overlap(this.patients, this.sprite, this.patientHitPlayer, null, this);
			this.game.physics.arcade.overlap(this.fakes, this.sprite, this.fakeHitPlayer, null, this);
			this.game.physics.arcade.overlap(this.patientsDead, this.sprite, this.patientDeadHitPlayer, null, this);
			this.game.physics.arcade.overlap(this.gabens, this.sprite, this.gabenHitPlayer, null, this);
			//this.game.physics.arcade.collide();
		},
		generateEnemy : function(){
			var enemy = this.enemies.getFirstExists(false);
			if(enemy)
			{
				enemy.reset(WIDTH - 30,Math.floor(Math.random()*(HEIGHT-30)),'enemyship'+(1+Math.floor(Math.random()*5)));
			}
			else
			{
				enemy = this.enemies.create(WIDTH - 30,Math.floor(Math.random()*(HEIGHT-30)),'enemyship'+(1+Math.floor(Math.random()*5)));
			}
			enemy.body.velocity.x = -this.enemySpeed;
			enemy.outOfBoundsKill = true;
			enemy.checkWorldBounds = true;
			enemy.animations.add('move');
			enemy.animations.play('move',0,true);
		},
		generatePatients : function(){
			var patient = this.patients.getFirstExists(false);
			//patient.set("hit",false);
			if(patient)
			{
				patient.reset(WIDTH - 10,Math.floor(Math.random()*(HEIGHT-60)),'patient'+(1+Math.floor(Math.random()*5)));
				hit = false;
			}
			else
			{
				patient = this.patients.create(WIDTH - 30,Math.floor(Math.random()*(HEIGHT-60)),'patient'+(1+Math.floor(Math.random()*5)));
				hit = false;
			}
			
			patient.body.velocity.x = -this.patientSpeed;
			patient.outOfBoundsKill = true;
			//patient.checkWorldBounds = true;
			patient.animations.add('move');
			patient.animations.play('move',0,true);
			
			
		},
		generatePatientsDead : function(){
			var patientDead = this.patientsDead.getFirstExists(false);
			//patient.set("hit",false);
			if(patientDead)
			{
				patientDead.reset(WIDTH - 30,Math.floor(Math.random()*(HEIGHT-30)),'patientcpy'+(1+Math.floor(Math.random()*5)));
				hit = false;
			}
			else
			{
				patientDead = this.patientsDead.create(WIDTH - 30,Math.floor(Math.random()*(HEIGHT-30)),'patientcpy'+(1+Math.floor(Math.random()*5)));
				hit = false;
			}
			
			patientDead.body.velocity.x = -this.patientDeadSpeed;
			patientDead.outOfBoundsKill = true;
			//patient.checkWorldBounds = true;
			patientDead.animations.add('move');
			patientDead.animations.play('move',0,true);
			
			
		},
		generateGabens : function(){
			var gaben = this.gabens.getFirstExists(false);
			//patient.set("hit",false);
			if(gaben)
			{
				gaben.reset(WIDTH - 30,Math.floor(Math.random()*(HEIGHT-30)),'gaben'+(1+Math.floor(Math.random()*2)));
				hit = false;
			}
			else
			{
				gaben = this.gabens.create(WIDTH - 30,Math.floor(Math.random()*(HEIGHT-30)),'gaben'+(1+Math.floor(Math.random()*2)));
				hit = false;
			}
			
			gaben.body.velocity.x = -this.gabenSpeed;
			gaben.outOfBoundsKill = true;
			//patient.checkWorldBounds = true;
			gaben.animations.add('move');
			gaben.animations.play('move',0,true);
			
			
		},
		generateFake : function(){
			var fake = this.fakes.getFirstExists(false);
			//patient.set("hit",false);
			if(fake)
			{
				fake.reset(WIDTH - 30,Math.floor(Math.random()*(HEIGHT-30)),'fake'+(1+Math.floor(Math.random()*5)));
				hit = false;
			}
			else
			{
				fake = this.fakes.create(WIDTH - 30,Math.floor(Math.random()*(HEIGHT-30)),'fake'+(1+Math.floor(Math.random()*5)));
				hit = false;
			}
			
			fake.body.velocity.x = -this.fakeSpeed;
			fake.outOfBoundsKill = true;
			//patient.checkWorldBounds = true;
			fake.animations.add('move');
			fake.animations.play('move',29,true);
			
			
		},
		fakeHitPlayer : function(player, fake){
			if(this.fakes.getIndex(fake) > -1)
				fake.kill();
			//this.lives += 1;
			this.numFakes += 1;
			this.music1.play();
			this.numFakesText.setText("Fake organs collected: "+this.numFakes);
			//this.numOrgansText.setText("Organs collected : "+this.numOrgans);
			//this.livesText.setText("Balloons hit by car : "+this.lives);
			this.score -= 75;
			this.scoreText.setText("Score : "+this.score);
			if(this.numFakes > this.rnd.integerInRange(240,600))
			{
				
				var text = "- Game Over!!!! Your Score is "+this.score;
				var style = { font: "35px Arial", fill: "#ff0044", align: "center" };
				var t = this.game.add.text(this.game.world.centerX-300, 0, text, style);
				this.game.state.start('menu');
			}	
			//if(this.lives > 30)
				//this.game.state.start('menu');
		},
		patientDeadHitPlayer : function(player, patientDead){
			if(this.patientsDead.getIndex(patientDead) > -1){
				patientDead.kill();
				this.numPatientsDead += 1;
		}
			//this.lives += 1;
			
			this.numPatientsDeadText.setText("Dead patients passed: "+this.numPatientsDead);
			//this.numOrgansText.setText("Organs collected : "+this.numOrgans);
			//this.livesText.setText("Balloons hit by car : "+this.lives);
			this.score -= 33;
			this.scoreText.setText("Score : "+this.score);	
			//if(this.lives > 30)
				//this.game.state.start('menu');
		},
		enemyHitPlayer : function(player, enemy){
			if(this.enemies.getIndex(enemy) > -1)
				
			enemy.kill();
			this.music2.play();
			this.numOrgans += 1;
			this.numOrgansText.setText("Organs collected : "+this.numOrgans);
			this.score += 50;
			this.scoreText.setText("Score : "+this.score);
			//if(this.lives > 30)
				//this.game.state.start('menu');
			if(this.numOrgans >= 300){
				this.game.state.start('menu');
			}
		},
		//FOr TA for grading, it was difficult for me to make the player hit the gaben and kill it
		//For Ta for grading, i had to play the game several times to determine the right numbers in this function
		gabenHitPlayer : function(player, gaben){
			if(this.gabens.getIndex(this.gaben) > -1){
				
				
			}
			gaben.kill();
			//this.lives += 1;
			//this.music2.play();
			this.music.play();
			this.numGabens += 1;
			this.numGabensText.setText("Gabens Stopped : "+this.numGabens);
			//this.livesText.setText("Balloons hit by car : "+this.lives);
			if(this.score >= 1000 && this.score <= 2000){
				this.score = this.score - 625;
			}
			else if(this.score >= 2000 && this.score <= 4000){
				this.score = this.score - 1250;
			}
			else if(this.score >= 4000 && this.score <= 8000){
				this.score = this.score - 1500;
			}
			else if(this.score >= 8000 && this.score <= 20000){
				this.score = this.score - 3000;
			}
			else{
				this.score = this.score - 250;
			}
			this.scoreText.setText("Score : "+this.score);
			//if(this.lives > 30)
				//this.game.state.start('menu');
			if(this.numOrgans >= 300){
				this.game.state.start('menu');
			}
		},
		patientHitPlayer : function(player, patient){
		
			//if(this.patients.getIndex(patient) > -100)
			//{
			//}
			patient.kill();
			
			//var style = { font: "20px Arial", fill: "#DE5F3D", align: "center" };
			//this.title = this.game.add.text(250,170,"Patient transferred to organ transplant",style);
				this.numOrgans -= 1;
					this.numOrgansText.setText("Organs collected : "+this.numOrgans);
					this.numDonated += 1;
					this.numDonatedText.setText("Patients passed and donated to: "+this.numDonated);
					this.score += 50;
					this.numPatientsTransferred  +=1;
					this.numOrgans +=1; //recieve an organ from a patient
					this.numPatientsText.setText(this.numPatientsTransferred+" patients transferred to hospital for organ transplant.");
					//this.numPatientsadText.setText("Patient #"+this.lastPatient+" transferred to hospital for organ transplant.");
					//this.patients.remove(patient);
				//this.lives += 1;
				//if(this.numDonated >= 450) //one simply cant reach that score
				//{
					//this.game.state.start('menu');
					//var text = "- Game Over!!!!! Your Score is "+this.score;
					//var style = { font: "35px Arial", fill: "#ff0044", align: "center" };

					//var t = this.game.add.text(this.game.world.centerX-300, 0, text, style);
				//}
				
				
				//this.livesText.setText("Balloons hit by car : "+this.lives);
				
				this.scoreText.setText("Score : "+this.score);
		},
		
	}

	var menuState = {
		preload : function(){
			this.game.load.image('bgSpace','mazehd1.png')
		},

		create : function(){
			//have to change speed to allow player enough time to think through the strategy
			//speed used to be 10
			//this.speed = 10;
			this.speed = 5
			this.bg = this.game.add.tileSprite(0,0,1920,1080,'bgSpace');
			this.bg.autoScroll(-this.speed,0);

			var style = { font: "48px Arial", fill: "#DE5F3D", align: "center" };
			this.title = this.game.add.text(110,170,"THIS GAME WILL BLOW YOUR MIND!!!!!",style);

			var style2 = { font: "28px Arial", fill: "#DE5F3D", align: "center" };
			this.help = this.game.add.text(250,230,"Get ready to collect some organs!!!",style2);
			var style3 = { font: "28px Arial", fill: "#DE5F3D", align: "center" };
		},

		update : function(){
			if(this.game.input.keyboard.isDown(Phaser.Keyboard.ENTER))
				this.game.state.start('main');
		}
	}

	_game.state.add('main', mainState);
	_game.state.add('menu', menuState);
	_game.state.start('menu');
})();
