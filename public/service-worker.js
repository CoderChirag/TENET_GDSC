/*
Copyright 2015, 2019, 2020, 2021 Google LLC. All Rights Reserved.
 Licensed under the Apache License, Version 2.0 (the "License");
 you may not use this file except in compliance with the License.
 You may obtain a copy of the License at
 http://www.apache.org/licenses/LICENSE-2.0
 Unless required by applicable law or agreed to in writing, software
 distributed under the License is distributed on an "AS IS" BASIS,
 WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 See the License for the specific language governing permissions and
 limitations under the License.
*/

const CACHE_NAME = 'offline';
// Customize this with a different URL if needed.
const OFFLINE_URL = '/';

self.addEventListener('install', event => {
	event.waitUntil(
		(async () => {
			const cache = await caches.open(CACHE_NAME);
			// Setting {cache: 'reload'} in the new request will ensure that the
			// response isn't fulfilled from the HTTP cache; i.e., it will be from
			// the network.
			console.log('Adding Cache Files');
			try {
				await cache.add(new Request(OFFLINE_URL, { cache: 'reload' }));
				await cache.addAll([
					'./',
					'./(index)',
					'./assets/BlockChain.svg',
					'./assets/chitkara_logo.png',
					'./assets/CompetitiveProgramming.svg',
					'./assets/Debate.svg',
					'./assets/Flutter.svg',
					'./assets/Gaming.svg',
					'./assets/GDSClogo.png',
					'./assets/heroVector.svg',
					'./assets/logo 1.svg',
					'./assets/Quiz.svg',
					'./assets/UIDesign.svg',
					'./assets/Web.svg',
					'./assets/Past Events/android_study_jams.webp',
					'./assets/Past Events/developer_bootcamp.jpg',
					'./assets/Past Events/devfest.webp',
					'./assets/Past Events/emerging_tech.webp',
					'./assets/Past Events/expert_tlk.webp',
					'./assets/Past Events/explore_ml.webp',
					'./assets/Past Events/gcp.webp',
					'./assets/Past Events/hactoberfest.webp',
					'./assets/Past Events/investment_for_students.webp',
					'./assets/Past Events/is_coe_enough.webp',
					'./assets/Past Events/latest-trends2.webp',
					'./assets/Past Events/latest_trends.webp',
					'./assets/Past Events/octahacks4.jpg',
					'./assets/Past Events/resume_building.webp',
					'./assets/Sponsors/community/GDSC Logo chapter AITAR.svg',
					'./assets/Sponsors/community/GDSC Logo chapter amity-mumbai.svg',
					'./assets/Sponsors/community/GDSC Logo chapter srcasw.svg',
					'./assets/Sponsors/community/ieicuiet_logo.png',
					'./assets/Sponsors/present/1pass.svg',
					'./assets/Sponsors/present/axure.png',
					'./assets/Sponsors/present/Bubble logo.svg',
					'./assets/Sponsors/present/cake_logo_white.svg',
					'./assets/Sponsors/present/celo.png',
					'./assets/Sponsors/present/devfolio.svg',
					'./assets/Sponsors/present/clerky.png',
					'./assets/Sponsors/present/filecoin.svg',
					'./assets/Sponsors/present/GMC LogoS.png',
					'./assets/Sponsors/present/polygon.svg',
					'./assets/Sponsors/present/RM-Logo_logotype.png',
					'./assets/Sponsors/present/Sketch-Logo-Dark.png',
					'./assets/Sponsors/present/sylogo.webp',
					'./assets/Sponsors/present/taskade-circle-icon.png',
					'./assets/Sponsors/present/tezos.svg',
					'./assets/Sponsors/present/towais.png',
					'./assets/Sponsors/present/wolfram.svg',
					'./assets/Sponsors/past/jetbrains.png',
					'./assets/Sponsors/past/Linode-Logo-Black.svg',
					'./assets/Sponsors/past/balsamiq.svg',
					'./assets/Sponsors/past/streamyard.svg',
					'./assets/logos/192x192.png',
					'./assets/logos/512x512.png',
					'./assets/logos/logo 1.ico',
					'./assets/logos/logo 1.png',
					'./css/sponsors.css',
					'./css/style.css',
					'./css/past_events.css',
					'./manifest.json',
					'./js/pwa.js',
					'./js/script.js',
				]);
				console.log('Cache Files Added');
			} catch (err) {
				console.log(err);
			}
		})()
	);
	// Force the waiting service worker to become the active service worker.
	self.skipWaiting();
});

self.addEventListener('activate', event => {
	event.waitUntil(
		(async () => {
			// Enable navigation preload if it's supported.
			// See https://developers.google.com/web/updates/2017/02/navigation-preload
			if ('navigationPreload' in self.registration) {
				await self.registration.navigationPreload.enable();
			}
		})()
	);

	// Tell the active service worker to take control of the page immediately.
	self.clients.claim();
});

self.addEventListener('fetch', event => {
	event.respondWith(
		(async () => {
			try {
				// First, try to use the navigation preload response if it's supported.
				const preloadResponse = await event.preloadResponse;
				if (preloadResponse) {
					return preloadResponse;
				}

				// Always try the network first.
				const networkResponse = await fetch(event.request);
				return networkResponse;
			} catch (error) {
				// catch is only triggered if an exception is thrown, which is likely
				// due to a network error.
				// If fetch() returns a valid HTTP response with a response code in
				// the 4xx or 5xx range, the catch() will NOT be called.

				const cache = await caches.open(CACHE_NAME);
				let cachedResponse = null;
				if (event.request.mode === 'navigate') {
					cachedResponse = await cache.match(OFFLINE_URL);
				} else {
					cachedResponse = await cache.match(event.request.url);
				}
				return cachedResponse;
			}
		})()
	);

	// If our if() condition is false, then this fetch handler won't intercept the
	// request. If there are any other fetch handlers registered, they will get a
	// chance to call event.respondWith(). If no fetch handlers call
	// event.respondWith(), the request will be handled by the browser as if there
	// were no service worker involvement.
});
