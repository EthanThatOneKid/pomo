# pomo 🍅

[![deno doc](https://doc.deno.land/badge.svg)](https://doc.deno.land/https://deno.land/x/pomo)

[Pomodoro](https://en.wikipedia.org/wiki/Pomodoro_Technique) utility module.

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
// Options for creating a pomo from a pattern
const pattern = "25w5b"; // 25 minutes of work, 5 minutes of break
const dayLength = 1 * 24 * 60 * 60 * 1e3; // 1 day in milliseconds
const ref = new Date(new Date().setHours(0, 0, 0, 0)).valueOf(); // Previous midnight
const scale = 1 * 60 * 1e3; // Scale minutes in pattern to milliseconds

const pomo = Pomo.fromPattern({
  pattern, // required
  dayLength, // required
  ref, // required
  scale, // default = 1
});

const stamp = pomo.at(new Date().valueOf());
console.log(format(stamp.timeout, "HH:mm:ss.SSS"));
```

## API

For generated API documentation, see <https://deno.land/x/pomo>.

## License

[MIT](LICENSE)

---

Made with 💖 by [**@EthanThatOneKid**](https://etok.codes/)
