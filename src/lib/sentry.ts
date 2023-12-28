import SentryNode from '@sentry/node';
import { PUBLIC_SENTRY_CONNECTION_URL } from '$env/static/public';

export default (() => {
	SentryNode.init({ dsn: PUBLIC_SENTRY_CONNECTION_URL });
	return SentryNode;
})();
