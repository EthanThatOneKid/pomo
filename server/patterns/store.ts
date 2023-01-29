import { z } from "../deps.ts";

import { GeneratedNumber, timestamps } from "../db.ts";

const UserTable = z.object({
  id: GeneratedNumber(),
  display_name: z.string(),
  ...timestamps(),
});

type UserTable = z.infer<typeof UserTable>;

export default UserTable;
