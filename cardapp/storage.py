from whitenoise.storage import CompressedManifestStaticFilesStorage

class SafeStaticFilesStorage(CompressedManifestStaticFilesStorage):
    manifest_strict = False

    def post_process(self, *args, **kwargs):
        for name, hashed_name, processed in super().post_process(*args, **kwargs):
            if isinstance(processed, Exception):
                continue
            yield name, hashed_name, processed