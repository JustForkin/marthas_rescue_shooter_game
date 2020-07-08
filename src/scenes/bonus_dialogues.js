import Phaser from 'phaser';
import createLabel from '../create_label';

export default class BonusDialogue extends Phaser.Scene {
  constructor(scene, key, content, nextDialogue) {
    super(scene);
    this.key = key;
    this.content = content;
    this.nextDialogue = nextDialogue;
  }

  create() {
    this.add.image(400, 300, this.key).setDisplaySize(800, 600);
    const dialog = this.rexUI.add.dialog({
      x: 400,
      y: 300,
      width: 500,
      background: this.rexUI.add.roundRectangle(0, 0, 100, 100, 20, 0x466D1D),
      title: createLabel(this, 'BONUS').setDraggable(),
      content: createLabel(this, this.content),
      actions: [
        createLabel(this, 'Missile + (Max 3)'),
        createLabel(this, 'Move Speed'),
        createLabel(this, 'Attack Speed'),
      ],
      space: {
        left: 20,
        right: 20,
        top: -20,
        bottom: -20,
        title: 25,
        content: 25,
        description: 25,
        choices: 25,
        leftToolbarItem: 5,
        toolbarItem: 5,
        choice: 15,
        action: 15,
      },

      expand: {
        title: false,
      },

      align: {
        title: 'center',
        actions: 'right',
      },

      click: {
        mode: 'release',
      },
    })
      .setDraggable('background')
      .layout()
      .popUp(1000);

    this.print = this.add.text(0, 0, '');
    dialog
      .on('button.click', function buttonClick(button) {
        let bonuses;
        if (this.key === 'desert') {
          bonuses = { bonus1: 0, bonus2: 0, bonus3: 0 };
        } else {
          bonuses = JSON.parse(localStorage.getItem('bonuses'));
        }
        if (button.text === 'Missile + (Max 3)') {
          bonuses.bonus1 += 1;
        } else if (button.text === 'Move Speed') {
          bonuses.bonus2 += 1;
        } else {
          bonuses.bonus3 += 1;
        }
        localStorage.setItem('bonuses', JSON.stringify(bonuses));
        this.scene.start(this.nextDialogue);
      }, this)
      .on('button.over', (button) => {
        button.getElement('background').setStrokeStyle(1, 0xffffff);
      })
      .on('button.out', (button) => {
        button.getElement('background').setStrokeStyle();
      });
  }
}
