import Phaser from 'phaser';
import Entity from '../entities';
import Shoot from '../attacks/shoot';

export default class Bomber extends Entity {
  constructor(scene, x, y) {
    super(scene, x, y, 'bomber', 'Bomber');

    this.body.velocity.y = Phaser.Math.Between(50, 100);

    this.shootTimer = this.scene.time.addEvent({
      delay: 1000,
      callback() {
        const bomb = new Shoot(this.scene, this.x, this.y, 'bomb', 1, 0);
        bomb.setScale(1.5);
        this.scene.enemyMissiles.add(bomb);
      },
      callbackScope: this,
      loop: true,
    });
  }
}