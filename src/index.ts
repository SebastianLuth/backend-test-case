import { app } from "./application/app";
import { logger } from "./application/logging";

app.listen(3000, () => logger.info('Server running on port 3000'))