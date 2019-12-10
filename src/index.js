'use strict';

class ActiveCache {

	constructor({prefix = 'c', stTTL = null} = {}) {
		this.PREFIX = prefix;
		this.stTTL = stTTL;

		this._isCacheKey = this._isCacheKey.bind(this);
	}

	static _now() { return (new Date()).getTime(); };

	static _isExpired(ttl) {
		return ttl < ActiveCache._now();
	}

	static _setItem(key, value) {
		try {
			sessionStorage.setItem(key, value);
			return true;
		}
		catch (e) {
			return false;
		}
	}

	static _getItem(key) {
		let item = sessionStorage.getItem(key);
		if (item) {
			try {
				item = JSON.parse(item);
			}
			catch (err) {
				console.warn(err);
			}
		}
		return item;
	}

	static _removeItem(key) {
		return sessionStorage.removeItem(key);
	}

	_purgeExpiredItems() {
		let items = Object.keys(sessionStorage).filter(this._isCacheKey);
		items.forEach((key) => {
			let item = ActiveCache._getItem(key);
			if (item && item.ttl && ActiveCache._isExpired(item.ttl)) {
				ActiveCache._removeItem(key);
			}
		});
	}

	_prefix(key) {
		return this.PREFIX + ':' + key;
	}

	_isCacheKey(key) {
		return key.indexOf(this.PREFIX) !== -1;
	}

	clear() {
		for (let key in sessionStorage) {
			if (this._isCacheKey(key)) {
				ActiveCache._removeItem(key);
			}
		}
	}

	get(key) {
		key = this._prefix(key);
		let item = ActiveCache._getItem(key);
		if (item && item.ttl && ActiveCache._isExpired(item.ttl)) {
			ActiveCache._removeItem(key);
			return null;
		}
		return item ? item : null;
	};

	set(key, value, ttl) {
		key = this._prefix(key);

		if (typeof ttl === 'undefined') { ttl = this.stTTL; }

		// Convert ttl from minutes to milliseconds
		if (ttl != null) {
			ttl = ActiveCache._now() + (ttl * 60000);
		}

		let item = {value: value, ttl: ttl};
		let itemStr;
		try {
			itemStr = JSON.stringify(item);
		}
		catch (err) {
			console.warn(err);
		}

		let isStored = ActiveCache._setItem(key, itemStr);
		if (!isStored) {
			ActiveCache._purgeExpiredItems();
			isStored = ActiveCache._setItem(key, itemStr);
		}
		return isStored;
	}

	del(key) {
		return ActiveCache._removeItem(this._prefix(key));
	}
}

module.exports = ActiveCache;
