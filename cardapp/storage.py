from whitenoise.storage import CompressedManifestStaticFilesStorage

class SafeStaticFilesStorage(CompressedManifestStaticFilesStorage):
    def post_process(self, *args, **kwargs):
        try:
            yield from super().post_process(*args, **kwargs)
        except Exception as e:
            print(f"Warning: static post-processing skipped an error: {e}")