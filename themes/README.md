# Shared themes

Drop exported ComfierUI `.json` theme files directly into this folder. In the client open Theme Settings → Profiles (reopen it to refresh the list). Select a Companion theme and press Load; use Save to keep a device copy. No host restart is needed after adding or changing files.

Files use schemaVersion 1, a name, colors keyed by existing theme role IDs (six-digit RGB hex), and optional transparency values from 0 to 100. The client Share button creates this format. Host files are read-only from the app; rename/delete them here. Invalid files are skipped with a server log message. Limits: 256 KB per file, 256 profiles and 4 MB per listing. Subfolders and symlinks are not read. Preserve this folder when updating Companion.
