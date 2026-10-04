# Shared themes

Place exported ComfierUI `.json` theme files directly in this folder. In the app, open **Theme Settings > Profiles**, select a Companion theme, and choose **Load**. Reopen Profiles to refresh the list. Use **Save** to keep a device copy. No host restart is needed after adding or changing files.

The app's **Share** button exports the supported format: `schemaVersion: 1`, a name, colors keyed by theme role IDs using six-digit RGB hex values, and optional transparency values from 0 to 100. Exported profiles can also include layout, appearance, and dimensions for compatible clients.

Host files are read-only from the app; rename or delete them here. Invalid files are skipped with a server log message. Limits are 256 KB per file, 256 profiles, and 4 MB per listing. Subfolders and symlinks are not read.

Preserve this folder and your theme files when updating Companion.
