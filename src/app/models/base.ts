export class Base {
  public $key: string;

  constructor(attributes?) {
    if (attributes) {
      let keys = Object.keys(attributes);
      // Temp Solution
      this.$key = attributes.$key;
      if (keys.length) {
        keys.forEach(el => {
          this[el] = attributes[el];
        });
      }
    }
  };

  get id(): string {
    return this.$key;
  }
}
