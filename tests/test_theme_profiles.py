import importlib.util
import json
import sys
import tempfile
import types
import unittest
from pathlib import Path
sys.modules.setdefault('server', types.SimpleNamespace(PromptServer=None))
spec = importlib.util.spec_from_file_location('theme_profiles', Path(__file__).resolve().parents[1] / 'theme_profiles.py')
themes = importlib.util.module_from_spec(spec)
spec.loader.exec_module(themes)

class ThemeTests(unittest.TestCase):
    def test_folder_refresh_and_validation(self):
        with tempfile.TemporaryDirectory() as directory:
            themes.ROOT = root = Path(directory)
            theme = {'schemaVersion': 1, 'name': 'Ocean', 'colors': {'icons': '#123456'}, 'transparency': {'icons': 50}}
            self.assertEqual(themes.list_profiles(), [])
            (root / 'ocean.json').write_text(json.dumps(theme))
            self.assertEqual(themes.list_profiles(), [theme])
            theme['layout'] = {'schemaVersion': 1, 'views': {}}
            theme['appearance'] = {'schemaVersion': 1, 'views': {}}
            theme['dimensions'] = {'button': {'height': 26}, 'container': {'frame': 1}}
            theme['transparency']['icons'] = 75
            (root / 'ocean.json').write_text(json.dumps(theme))
            self.assertEqual(themes.list_profiles()[0]['transparency']['icons'], 75)
            self.assertEqual(themes.list_profiles()[0]['layout'], theme['layout'])
            self.assertEqual(themes.list_profiles()[0]['appearance'], theme['appearance'])
            self.assertEqual(themes.list_profiles()[0]['dimensions'], theme['dimensions'])
            (root / 'bad-dimensions.json').write_text(json.dumps(dict(theme, dimensions=[])))
            (root / 'bad.json').write_text('{broken')
            (root / 'array.json').write_text('[]')
            (root / 'huge.json').write_bytes(b' ' * (themes.MAX_BYTES + 1))
            (root / 'bad-alpha.json').write_text(json.dumps(dict(theme, transparency={'icons': 101})))
            (root / 'bool-alpha.json').write_text(json.dumps(dict(theme, transparency={'icons': True})))
            (root / 'nan.json').write_text(json.dumps(dict(theme, transparency={'icons': float('nan')})))
            (root / 'subfolder').mkdir()
            (root / 'subfolder' / 'hidden.json').write_text(json.dumps(theme))
            (root / 'linked.json').symlink_to(root / 'ocean.json')
            self.assertEqual(len(themes.list_profiles()), 1)
            (root / 'ocean.json').unlink()
            self.assertEqual(themes.list_profiles(), [])

if __name__ == '__main__': unittest.main()
