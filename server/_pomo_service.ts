export const startPomo = async (pomo: PomoService, opts: any) => {
  pomo.addEventHandler("update", (ev) => {
  });

  let updatePromise = Promise.resolve();

  function update() {}

  let nextSleep = 0;
  while (await Promise.any(sleep(nextSleep), updatePromise)) {
    fireDiscordMessages();
    nextSleep = getNextSleep();
  }

  return { update };
};

async function sleep(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

function getNextSleep() {
  return 1000;
}
