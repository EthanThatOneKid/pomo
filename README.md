# pomo

[![deno doc](https://doc.deno.land/badge.svg)](https://doc.deno.land/https://deno.land/x/pomo)

Pomodoro utility module.

## Installation and Usage

### Deno

```ts
import { format, Pomo } from "https://deno.land/x/pomo/mod.ts";
```

### Node.js

Install the module as an NPM package:

```sh
npm i https://github.com/ethanthatonekid/pomo.git#npm
```

Then, import it in your project:

```ts
import { format, Pomo } from "pomo";
```

### Example usage

```ts
const pomo = Pomo.fromPattern({
  pattern: "25w5b25w5b25w5b25w15b",
  dayLength: 25 * 60 * 1000,
  dayStart: new Date().setHours(0, 0, 0, 0),
  scale: 1 * 60 * 1e3, // Scale minutes in pattern to milliseconds (default = 1).
});

const stamp = pomo.at(new Date().getTime());
console.log(format(stamp.until, "mm:ss.SSS"));
```

## API

For generated API documentation, see <https://deno.land/x/pomo>.

## License

[MIT](LICENSE)

---

Made with :heart: by [**@EthanThatOneKid**](https://etok.codes/)
