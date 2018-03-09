(function(e, a) { for(var i in a) e[i] = a[i]; }(exports, /******/ (function(modules) { // webpackBootstrap
/******/ 	// eslint-disable-next-line no-unused-vars
/******/ 	function hotDownloadUpdateChunk(chunkId) {
/******/ 		var chunk = require("./" + "" + chunkId + "." + hotCurrentHash + ".hot-update.js");
/******/ 		hotAddUpdateChunk(chunk.id, chunk.modules);
/******/ 	}
/******/
/******/ 	// eslint-disable-next-line no-unused-vars
/******/ 	function hotDownloadManifest() {
/******/ 		try {
/******/ 			var update = require("./" + "" + hotCurrentHash + ".hot-update.json");
/******/ 		} catch (e) {
/******/ 			return Promise.resolve();
/******/ 		}
/******/ 		return Promise.resolve(update);
/******/ 	}
/******/
/******/ 	//eslint-disable-next-line no-unused-vars
/******/ 	function hotDisposeChunk(chunkId) {
/******/ 		delete installedChunks[chunkId];
/******/ 	}
/******/
/******/ 	var hotApplyOnUpdate = true;
/******/ 	var hotCurrentHash = "7ed66557c4f9da0125e8"; // eslint-disable-line no-unused-vars
/******/ 	var hotRequestTimeout = 10000;
/******/ 	var hotCurrentModuleData = {};
/******/ 	var hotCurrentChildModule; // eslint-disable-line no-unused-vars
/******/ 	var hotCurrentParents = []; // eslint-disable-line no-unused-vars
/******/ 	var hotCurrentParentsTemp = []; // eslint-disable-line no-unused-vars
/******/
/******/ 	// eslint-disable-next-line no-unused-vars
/******/ 	function hotCreateRequire(moduleId) {
/******/ 		var me = installedModules[moduleId];
/******/ 		if (!me) return __webpack_require__;
/******/ 		var fn = function(request) {
/******/ 			if (me.hot.active) {
/******/ 				if (installedModules[request]) {
/******/ 					if (!installedModules[request].parents.includes(moduleId))
/******/ 						installedModules[request].parents.push(moduleId);
/******/ 				} else {
/******/ 					hotCurrentParents = [moduleId];
/******/ 					hotCurrentChildModule = request;
/******/ 				}
/******/ 				if (!me.children.includes(request)) me.children.push(request);
/******/ 			} else {
/******/ 				console.warn(
/******/ 					"[HMR] unexpected require(" +
/******/ 						request +
/******/ 						") from disposed module " +
/******/ 						moduleId
/******/ 				);
/******/ 				hotCurrentParents = [];
/******/ 			}
/******/ 			return __webpack_require__(request);
/******/ 		};
/******/ 		var ObjectFactory = function ObjectFactory(name) {
/******/ 			return {
/******/ 				configurable: true,
/******/ 				enumerable: true,
/******/ 				get: function() {
/******/ 					return __webpack_require__[name];
/******/ 				},
/******/ 				set: function(value) {
/******/ 					__webpack_require__[name] = value;
/******/ 				}
/******/ 			};
/******/ 		};
/******/ 		for (var name in __webpack_require__) {
/******/ 			if (
/******/ 				Object.prototype.hasOwnProperty.call(__webpack_require__, name) &&
/******/ 				name !== "e"
/******/ 			) {
/******/ 				Object.defineProperty(fn, name, ObjectFactory(name));
/******/ 			}
/******/ 		}
/******/ 		fn.e = function(chunkId) {
/******/ 			if (hotStatus === "ready") hotSetStatus("prepare");
/******/ 			hotChunksLoading++;
/******/ 			return __webpack_require__.e(chunkId).then(finishChunkLoading, function(err) {
/******/ 				finishChunkLoading();
/******/ 				throw err;
/******/ 			});
/******/
/******/ 			function finishChunkLoading() {
/******/ 				hotChunksLoading--;
/******/ 				if (hotStatus === "prepare") {
/******/ 					if (!hotWaitingFilesMap[chunkId]) {
/******/ 						hotEnsureUpdateChunk(chunkId);
/******/ 					}
/******/ 					if (hotChunksLoading === 0 && hotWaitingFiles === 0) {
/******/ 						hotUpdateDownloaded();
/******/ 					}
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 		return fn;
/******/ 	}
/******/
/******/ 	// eslint-disable-next-line no-unused-vars
/******/ 	function hotCreateModule(moduleId) {
/******/ 		var hot = {
/******/ 			// private stuff
/******/ 			_acceptedDependencies: {},
/******/ 			_declinedDependencies: {},
/******/ 			_selfAccepted: false,
/******/ 			_selfDeclined: false,
/******/ 			_disposeHandlers: [],
/******/ 			_main: hotCurrentChildModule !== moduleId,
/******/
/******/ 			// Module API
/******/ 			active: true,
/******/ 			accept: function(dep, callback) {
/******/ 				if (typeof dep === "undefined") hot._selfAccepted = true;
/******/ 				else if (typeof dep === "function") hot._selfAccepted = dep;
/******/ 				else if (typeof dep === "object")
/******/ 					for (var i = 0; i < dep.length; i++)
/******/ 						hot._acceptedDependencies[dep[i]] = callback || function() {};
/******/ 				else hot._acceptedDependencies[dep] = callback || function() {};
/******/ 			},
/******/ 			decline: function(dep) {
/******/ 				if (typeof dep === "undefined") hot._selfDeclined = true;
/******/ 				else if (typeof dep === "object")
/******/ 					for (var i = 0; i < dep.length; i++)
/******/ 						hot._declinedDependencies[dep[i]] = true;
/******/ 				else hot._declinedDependencies[dep] = true;
/******/ 			},
/******/ 			dispose: function(callback) {
/******/ 				hot._disposeHandlers.push(callback);
/******/ 			},
/******/ 			addDisposeHandler: function(callback) {
/******/ 				hot._disposeHandlers.push(callback);
/******/ 			},
/******/ 			removeDisposeHandler: function(callback) {
/******/ 				var idx = hot._disposeHandlers.indexOf(callback);
/******/ 				if (idx >= 0) hot._disposeHandlers.splice(idx, 1);
/******/ 			},
/******/
/******/ 			// Management API
/******/ 			check: hotCheck,
/******/ 			apply: hotApply,
/******/ 			status: function(l) {
/******/ 				if (!l) return hotStatus;
/******/ 				hotStatusHandlers.push(l);
/******/ 			},
/******/ 			addStatusHandler: function(l) {
/******/ 				hotStatusHandlers.push(l);
/******/ 			},
/******/ 			removeStatusHandler: function(l) {
/******/ 				var idx = hotStatusHandlers.indexOf(l);
/******/ 				if (idx >= 0) hotStatusHandlers.splice(idx, 1);
/******/ 			},
/******/
/******/ 			//inherit from previous dispose call
/******/ 			data: hotCurrentModuleData[moduleId]
/******/ 		};
/******/ 		hotCurrentChildModule = undefined;
/******/ 		return hot;
/******/ 	}
/******/
/******/ 	var hotStatusHandlers = [];
/******/ 	var hotStatus = "idle";
/******/
/******/ 	function hotSetStatus(newStatus) {
/******/ 		hotStatus = newStatus;
/******/ 		for (var i = 0; i < hotStatusHandlers.length; i++)
/******/ 			hotStatusHandlers[i].call(null, newStatus);
/******/ 	}
/******/
/******/ 	// while downloading
/******/ 	var hotWaitingFiles = 0;
/******/ 	var hotChunksLoading = 0;
/******/ 	var hotWaitingFilesMap = {};
/******/ 	var hotRequestedFilesMap = {};
/******/ 	var hotAvailableFilesMap = {};
/******/ 	var hotDeferred;
/******/
/******/ 	// The update info
/******/ 	var hotUpdate, hotUpdateNewHash;
/******/
/******/ 	function toModuleId(id) {
/******/ 		var isNumber = +id + "" === id;
/******/ 		return isNumber ? +id : id;
/******/ 	}
/******/
/******/ 	function hotCheck(apply) {
/******/ 		if (hotStatus !== "idle")
/******/ 			throw new Error("check() is only allowed in idle status");
/******/ 		hotApplyOnUpdate = apply;
/******/ 		hotSetStatus("check");
/******/ 		return hotDownloadManifest(hotRequestTimeout).then(function(update) {
/******/ 			if (!update) {
/******/ 				hotSetStatus("idle");
/******/ 				return null;
/******/ 			}
/******/ 			hotRequestedFilesMap = {};
/******/ 			hotWaitingFilesMap = {};
/******/ 			hotAvailableFilesMap = update.c;
/******/ 			hotUpdateNewHash = update.h;
/******/
/******/ 			hotSetStatus("prepare");
/******/ 			var promise = new Promise(function(resolve, reject) {
/******/ 				hotDeferred = {
/******/ 					resolve: resolve,
/******/ 					reject: reject
/******/ 				};
/******/ 			});
/******/ 			hotUpdate = {};
/******/ 			var chunkId = "main";
/******/ 			{
/******/ 				// eslint-disable-line no-lone-blocks
/******/ 				/*globals chunkId */
/******/ 				hotEnsureUpdateChunk(chunkId);
/******/ 			}
/******/ 			if (
/******/ 				hotStatus === "prepare" &&
/******/ 				hotChunksLoading === 0 &&
/******/ 				hotWaitingFiles === 0
/******/ 			) {
/******/ 				hotUpdateDownloaded();
/******/ 			}
/******/ 			return promise;
/******/ 		});
/******/ 	}
/******/
/******/ 	// eslint-disable-next-line no-unused-vars
/******/ 	function hotAddUpdateChunk(chunkId, moreModules) {
/******/ 		if (!hotAvailableFilesMap[chunkId] || !hotRequestedFilesMap[chunkId])
/******/ 			return;
/******/ 		hotRequestedFilesMap[chunkId] = false;
/******/ 		for (var moduleId in moreModules) {
/******/ 			if (Object.prototype.hasOwnProperty.call(moreModules, moduleId)) {
/******/ 				hotUpdate[moduleId] = moreModules[moduleId];
/******/ 			}
/******/ 		}
/******/ 		if (--hotWaitingFiles === 0 && hotChunksLoading === 0) {
/******/ 			hotUpdateDownloaded();
/******/ 		}
/******/ 	}
/******/
/******/ 	function hotEnsureUpdateChunk(chunkId) {
/******/ 		if (!hotAvailableFilesMap[chunkId]) {
/******/ 			hotWaitingFilesMap[chunkId] = true;
/******/ 		} else {
/******/ 			hotRequestedFilesMap[chunkId] = true;
/******/ 			hotWaitingFiles++;
/******/ 			hotDownloadUpdateChunk(chunkId);
/******/ 		}
/******/ 	}
/******/
/******/ 	function hotUpdateDownloaded() {
/******/ 		hotSetStatus("ready");
/******/ 		var deferred = hotDeferred;
/******/ 		hotDeferred = null;
/******/ 		if (!deferred) return;
/******/ 		if (hotApplyOnUpdate) {
/******/ 			// Wrap deferred object in Promise to mark it as a well-handled Promise to
/******/ 			// avoid triggering uncaught exception warning in Chrome.
/******/ 			// See https://bugs.chromium.org/p/chromium/issues/detail?id=465666
/******/ 			Promise.resolve()
/******/ 				.then(function() {
/******/ 					return hotApply(hotApplyOnUpdate);
/******/ 				})
/******/ 				.then(
/******/ 					function(result) {
/******/ 						deferred.resolve(result);
/******/ 					},
/******/ 					function(err) {
/******/ 						deferred.reject(err);
/******/ 					}
/******/ 				);
/******/ 		} else {
/******/ 			var outdatedModules = [];
/******/ 			for (var id in hotUpdate) {
/******/ 				if (Object.prototype.hasOwnProperty.call(hotUpdate, id)) {
/******/ 					outdatedModules.push(toModuleId(id));
/******/ 				}
/******/ 			}
/******/ 			deferred.resolve(outdatedModules);
/******/ 		}
/******/ 	}
/******/
/******/ 	function hotApply(options) {
/******/ 		if (hotStatus !== "ready")
/******/ 			throw new Error("apply() is only allowed in ready status");
/******/ 		options = options || {};
/******/
/******/ 		var cb;
/******/ 		var i;
/******/ 		var j;
/******/ 		var module;
/******/ 		var moduleId;
/******/
/******/ 		function getAffectedStuff(updateModuleId) {
/******/ 			var outdatedModules = [updateModuleId];
/******/ 			var outdatedDependencies = {};
/******/
/******/ 			var queue = outdatedModules.slice().map(function(id) {
/******/ 				return {
/******/ 					chain: [id],
/******/ 					id: id
/******/ 				};
/******/ 			});
/******/ 			while (queue.length > 0) {
/******/ 				var queueItem = queue.pop();
/******/ 				var moduleId = queueItem.id;
/******/ 				var chain = queueItem.chain;
/******/ 				module = installedModules[moduleId];
/******/ 				if (!module || module.hot._selfAccepted) continue;
/******/ 				if (module.hot._selfDeclined) {
/******/ 					return {
/******/ 						type: "self-declined",
/******/ 						chain: chain,
/******/ 						moduleId: moduleId
/******/ 					};
/******/ 				}
/******/ 				if (module.hot._main) {
/******/ 					return {
/******/ 						type: "unaccepted",
/******/ 						chain: chain,
/******/ 						moduleId: moduleId
/******/ 					};
/******/ 				}
/******/ 				for (var i = 0; i < module.parents.length; i++) {
/******/ 					var parentId = module.parents[i];
/******/ 					var parent = installedModules[parentId];
/******/ 					if (!parent) continue;
/******/ 					if (parent.hot._declinedDependencies[moduleId]) {
/******/ 						return {
/******/ 							type: "declined",
/******/ 							chain: chain.concat([parentId]),
/******/ 							moduleId: moduleId,
/******/ 							parentId: parentId
/******/ 						};
/******/ 					}
/******/ 					if (outdatedModules.includes(parentId)) continue;
/******/ 					if (parent.hot._acceptedDependencies[moduleId]) {
/******/ 						if (!outdatedDependencies[parentId])
/******/ 							outdatedDependencies[parentId] = [];
/******/ 						addAllToSet(outdatedDependencies[parentId], [moduleId]);
/******/ 						continue;
/******/ 					}
/******/ 					delete outdatedDependencies[parentId];
/******/ 					outdatedModules.push(parentId);
/******/ 					queue.push({
/******/ 						chain: chain.concat([parentId]),
/******/ 						id: parentId
/******/ 					});
/******/ 				}
/******/ 			}
/******/
/******/ 			return {
/******/ 				type: "accepted",
/******/ 				moduleId: updateModuleId,
/******/ 				outdatedModules: outdatedModules,
/******/ 				outdatedDependencies: outdatedDependencies
/******/ 			};
/******/ 		}
/******/
/******/ 		function addAllToSet(a, b) {
/******/ 			for (var i = 0; i < b.length; i++) {
/******/ 				var item = b[i];
/******/ 				if (!a.includes(item)) a.push(item);
/******/ 			}
/******/ 		}
/******/
/******/ 		// at begin all updates modules are outdated
/******/ 		// the "outdated" status can propagate to parents if they don't accept the children
/******/ 		var outdatedDependencies = {};
/******/ 		var outdatedModules = [];
/******/ 		var appliedUpdate = {};
/******/
/******/ 		var warnUnexpectedRequire = function warnUnexpectedRequire() {
/******/ 			console.warn(
/******/ 				"[HMR] unexpected require(" + result.moduleId + ") to disposed module"
/******/ 			);
/******/ 		};
/******/
/******/ 		for (var id in hotUpdate) {
/******/ 			if (Object.prototype.hasOwnProperty.call(hotUpdate, id)) {
/******/ 				moduleId = toModuleId(id);
/******/ 				var result;
/******/ 				if (hotUpdate[id]) {
/******/ 					result = getAffectedStuff(moduleId);
/******/ 				} else {
/******/ 					result = {
/******/ 						type: "disposed",
/******/ 						moduleId: id
/******/ 					};
/******/ 				}
/******/ 				var abortError = false;
/******/ 				var doApply = false;
/******/ 				var doDispose = false;
/******/ 				var chainInfo = "";
/******/ 				if (result.chain) {
/******/ 					chainInfo = "\nUpdate propagation: " + result.chain.join(" -> ");
/******/ 				}
/******/ 				switch (result.type) {
/******/ 					case "self-declined":
/******/ 						if (options.onDeclined) options.onDeclined(result);
/******/ 						if (!options.ignoreDeclined)
/******/ 							abortError = new Error(
/******/ 								"Aborted because of self decline: " +
/******/ 									result.moduleId +
/******/ 									chainInfo
/******/ 							);
/******/ 						break;
/******/ 					case "declined":
/******/ 						if (options.onDeclined) options.onDeclined(result);
/******/ 						if (!options.ignoreDeclined)
/******/ 							abortError = new Error(
/******/ 								"Aborted because of declined dependency: " +
/******/ 									result.moduleId +
/******/ 									" in " +
/******/ 									result.parentId +
/******/ 									chainInfo
/******/ 							);
/******/ 						break;
/******/ 					case "unaccepted":
/******/ 						if (options.onUnaccepted) options.onUnaccepted(result);
/******/ 						if (!options.ignoreUnaccepted)
/******/ 							abortError = new Error(
/******/ 								"Aborted because " + moduleId + " is not accepted" + chainInfo
/******/ 							);
/******/ 						break;
/******/ 					case "accepted":
/******/ 						if (options.onAccepted) options.onAccepted(result);
/******/ 						doApply = true;
/******/ 						break;
/******/ 					case "disposed":
/******/ 						if (options.onDisposed) options.onDisposed(result);
/******/ 						doDispose = true;
/******/ 						break;
/******/ 					default:
/******/ 						throw new Error("Unexception type " + result.type);
/******/ 				}
/******/ 				if (abortError) {
/******/ 					hotSetStatus("abort");
/******/ 					return Promise.reject(abortError);
/******/ 				}
/******/ 				if (doApply) {
/******/ 					appliedUpdate[moduleId] = hotUpdate[moduleId];
/******/ 					addAllToSet(outdatedModules, result.outdatedModules);
/******/ 					for (moduleId in result.outdatedDependencies) {
/******/ 						if (
/******/ 							Object.prototype.hasOwnProperty.call(
/******/ 								result.outdatedDependencies,
/******/ 								moduleId
/******/ 							)
/******/ 						) {
/******/ 							if (!outdatedDependencies[moduleId])
/******/ 								outdatedDependencies[moduleId] = [];
/******/ 							addAllToSet(
/******/ 								outdatedDependencies[moduleId],
/******/ 								result.outdatedDependencies[moduleId]
/******/ 							);
/******/ 						}
/******/ 					}
/******/ 				}
/******/ 				if (doDispose) {
/******/ 					addAllToSet(outdatedModules, [result.moduleId]);
/******/ 					appliedUpdate[moduleId] = warnUnexpectedRequire;
/******/ 				}
/******/ 			}
/******/ 		}
/******/
/******/ 		// Store self accepted outdated modules to require them later by the module system
/******/ 		var outdatedSelfAcceptedModules = [];
/******/ 		for (i = 0; i < outdatedModules.length; i++) {
/******/ 			moduleId = outdatedModules[i];
/******/ 			if (
/******/ 				installedModules[moduleId] &&
/******/ 				installedModules[moduleId].hot._selfAccepted
/******/ 			)
/******/ 				outdatedSelfAcceptedModules.push({
/******/ 					module: moduleId,
/******/ 					errorHandler: installedModules[moduleId].hot._selfAccepted
/******/ 				});
/******/ 		}
/******/
/******/ 		// Now in "dispose" phase
/******/ 		hotSetStatus("dispose");
/******/ 		Object.keys(hotAvailableFilesMap).forEach(function(chunkId) {
/******/ 			if (hotAvailableFilesMap[chunkId] === false) {
/******/ 				hotDisposeChunk(chunkId);
/******/ 			}
/******/ 		});
/******/
/******/ 		var idx;
/******/ 		var queue = outdatedModules.slice();
/******/ 		while (queue.length > 0) {
/******/ 			moduleId = queue.pop();
/******/ 			module = installedModules[moduleId];
/******/ 			if (!module) continue;
/******/
/******/ 			var data = {};
/******/
/******/ 			// Call dispose handlers
/******/ 			var disposeHandlers = module.hot._disposeHandlers;
/******/ 			for (j = 0; j < disposeHandlers.length; j++) {
/******/ 				cb = disposeHandlers[j];
/******/ 				cb(data);
/******/ 			}
/******/ 			hotCurrentModuleData[moduleId] = data;
/******/
/******/ 			// disable module (this disables requires from this module)
/******/ 			module.hot.active = false;
/******/
/******/ 			// remove module from cache
/******/ 			delete installedModules[moduleId];
/******/
/******/ 			// when disposing there is no need to call dispose handler
/******/ 			delete outdatedDependencies[moduleId];
/******/
/******/ 			// remove "parents" references from all children
/******/ 			for (j = 0; j < module.children.length; j++) {
/******/ 				var child = installedModules[module.children[j]];
/******/ 				if (!child) continue;
/******/ 				idx = child.parents.indexOf(moduleId);
/******/ 				if (idx >= 0) {
/******/ 					child.parents.splice(idx, 1);
/******/ 				}
/******/ 			}
/******/ 		}
/******/
/******/ 		// remove outdated dependency from module children
/******/ 		var dependency;
/******/ 		var moduleOutdatedDependencies;
/******/ 		for (moduleId in outdatedDependencies) {
/******/ 			if (
/******/ 				Object.prototype.hasOwnProperty.call(outdatedDependencies, moduleId)
/******/ 			) {
/******/ 				module = installedModules[moduleId];
/******/ 				if (module) {
/******/ 					moduleOutdatedDependencies = outdatedDependencies[moduleId];
/******/ 					for (j = 0; j < moduleOutdatedDependencies.length; j++) {
/******/ 						dependency = moduleOutdatedDependencies[j];
/******/ 						idx = module.children.indexOf(dependency);
/******/ 						if (idx >= 0) module.children.splice(idx, 1);
/******/ 					}
/******/ 				}
/******/ 			}
/******/ 		}
/******/
/******/ 		// Not in "apply" phase
/******/ 		hotSetStatus("apply");
/******/
/******/ 		hotCurrentHash = hotUpdateNewHash;
/******/
/******/ 		// insert new code
/******/ 		for (moduleId in appliedUpdate) {
/******/ 			if (Object.prototype.hasOwnProperty.call(appliedUpdate, moduleId)) {
/******/ 				modules[moduleId] = appliedUpdate[moduleId];
/******/ 			}
/******/ 		}
/******/
/******/ 		// call accept handlers
/******/ 		var error = null;
/******/ 		for (moduleId in outdatedDependencies) {
/******/ 			if (
/******/ 				Object.prototype.hasOwnProperty.call(outdatedDependencies, moduleId)
/******/ 			) {
/******/ 				module = installedModules[moduleId];
/******/ 				if (module) {
/******/ 					moduleOutdatedDependencies = outdatedDependencies[moduleId];
/******/ 					var callbacks = [];
/******/ 					for (i = 0; i < moduleOutdatedDependencies.length; i++) {
/******/ 						dependency = moduleOutdatedDependencies[i];
/******/ 						cb = module.hot._acceptedDependencies[dependency];
/******/ 						if (cb) {
/******/ 							if (callbacks.includes(cb)) continue;
/******/ 							callbacks.push(cb);
/******/ 						}
/******/ 					}
/******/ 					for (i = 0; i < callbacks.length; i++) {
/******/ 						cb = callbacks[i];
/******/ 						try {
/******/ 							cb(moduleOutdatedDependencies);
/******/ 						} catch (err) {
/******/ 							if (options.onErrored) {
/******/ 								options.onErrored({
/******/ 									type: "accept-errored",
/******/ 									moduleId: moduleId,
/******/ 									dependencyId: moduleOutdatedDependencies[i],
/******/ 									error: err
/******/ 								});
/******/ 							}
/******/ 							if (!options.ignoreErrored) {
/******/ 								if (!error) error = err;
/******/ 							}
/******/ 						}
/******/ 					}
/******/ 				}
/******/ 			}
/******/ 		}
/******/
/******/ 		// Load self accepted modules
/******/ 		for (i = 0; i < outdatedSelfAcceptedModules.length; i++) {
/******/ 			var item = outdatedSelfAcceptedModules[i];
/******/ 			moduleId = item.module;
/******/ 			hotCurrentParents = [moduleId];
/******/ 			try {
/******/ 				__webpack_require__(moduleId);
/******/ 			} catch (err) {
/******/ 				if (typeof item.errorHandler === "function") {
/******/ 					try {
/******/ 						item.errorHandler(err);
/******/ 					} catch (err2) {
/******/ 						if (options.onErrored) {
/******/ 							options.onErrored({
/******/ 								type: "self-accept-error-handler-errored",
/******/ 								moduleId: moduleId,
/******/ 								error: err2,
/******/ 								originalError: err
/******/ 							});
/******/ 						}
/******/ 						if (!options.ignoreErrored) {
/******/ 							if (!error) error = err2;
/******/ 						}
/******/ 						if (!error) error = err;
/******/ 					}
/******/ 				} else {
/******/ 					if (options.onErrored) {
/******/ 						options.onErrored({
/******/ 							type: "self-accept-errored",
/******/ 							moduleId: moduleId,
/******/ 							error: err
/******/ 						});
/******/ 					}
/******/ 					if (!options.ignoreErrored) {
/******/ 						if (!error) error = err;
/******/ 					}
/******/ 				}
/******/ 			}
/******/ 		}
/******/
/******/ 		// handle errors in accept handlers and self accepted module load
/******/ 		if (error) {
/******/ 			hotSetStatus("fail");
/******/ 			return Promise.reject(error);
/******/ 		}
/******/
/******/ 		hotSetStatus("idle");
/******/ 		return new Promise(function(resolve) {
/******/ 			resolve(outdatedModules);
/******/ 		});
/******/ 	}
/******/
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// object to store loaded and loading wasm modules
/******/ 	var installedWasmModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {},
/******/ 			hot: hotCreateModule(moduleId),
/******/ 			parents: (hotCurrentParentsTemp = hotCurrentParents, hotCurrentParents = [], hotCurrentParentsTemp),
/******/ 			children: []
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, hotCreateRequire(moduleId));
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// object with all compiled WebAssembly.Modules
/******/ 	__webpack_require__.w = {};
/******/
/******/ 	// __webpack_hash__
/******/ 	__webpack_require__.h = function() { return hotCurrentHash; };
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return hotCreateRequire("./src/bin/www.ts")(__webpack_require__.s = "./src/bin/www.ts");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/app.ts":
/*!********************!*\
  !*** ./src/app.ts ***!
  \********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\nObject.defineProperty(exports, \"__esModule\", { value: true });\nconst express = __webpack_require__(/*! express */ \"express\");\nconst logger = __webpack_require__(/*! morgan */ \"morgan\");\nconst cookieParser = __webpack_require__(/*! cookie-parser */ \"cookie-parser\");\nconst bodyParser = __webpack_require__(/*! body-parser */ \"body-parser\");\nconst helmet = __webpack_require__(/*! helmet */ \"helmet\");\nconst routes_1 = __webpack_require__(/*! ./routes */ \"./src/routes/index.ts\");\nexports.App = express()\n    .use(logger('dev'))\n    .use(bodyParser.json())\n    .use(bodyParser.urlencoded({ extended: false }))\n    .use(cookieParser())\n    .use('/', routes_1.Routes)\n    .use(helmet())\n    .disable('x-powered-by');\n\n\n//# sourceURL=webpack:///./src/app.ts?");

/***/ }),

/***/ "./src/bin/www.ts":
/*!************************!*\
  !*** ./src/bin/www.ts ***!
  \************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\nObject.defineProperty(exports, \"__esModule\", { value: true });\nconst debug = __webpack_require__(/*! debug */ \"debug\");\nconst http = __webpack_require__(/*! http */ \"http\");\nconst config_1 = __webpack_require__(/*! ../config */ \"./src/config/index.ts\");\nconst app_1 = __webpack_require__(/*! ../app */ \"./src/app.ts\");\nconst port = normalizePort(process.env.PORT || config_1.Config.api.port);\napp_1.App.set('port', port);\nconst server = http.createServer(app_1.App);\nserver.listen(port);\nserver.on('error', onError);\nserver.on('listening', onListening);\nfunction normalizePort(val) {\n    let port = parseInt(val, 10);\n    if (isNaN(port))\n        return val;\n    if (port >= 0)\n        return port;\n    return false;\n}\nfunction onError(error) {\n    if (error.syscall !== 'listen')\n        throw error;\n    let bind = typeof port === 'string'\n        ? 'Pipe ' + port\n        : 'Port ' + port;\n    switch (error.code) {\n        case 'EACCES':\n            console.error(bind + ' requires elevated privileges');\n            process.exit(1);\n            break;\n        case 'EADDRINUSE':\n            console.error(bind + ' is already in use');\n            process.exit(1);\n            break;\n        default:\n            throw error;\n    }\n}\nfunction onListening() {\n    let addr = server.address(), bind = typeof addr === 'string'\n        ? 'pipe ' + addr\n        : 'port ' + addr.port;\n    debug('Listening on ' + bind);\n}\n\n\n//# sourceURL=webpack:///./src/bin/www.ts?");

/***/ }),

/***/ "./src/config/index.ts":
/*!*****************************!*\
  !*** ./src/config/index.ts ***!
  \*****************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\nObject.defineProperty(exports, \"__esModule\", { value: true });\nexports.Config = {\n    database: {\n        path: 'mongodb://127.0.0.1:27017/',\n        db: 'meimei',\n        collections: {\n            test: 'test',\n            users: 'users',\n            passwords: 'passwords',\n            tokens: 'tokens'\n        }\n    },\n    token: {\n        secret: 'top-secret-token',\n        expiration: 7\n    },\n    api: {\n        port: '3000',\n        version: 1,\n        path: '/api/1'\n    }\n};\n\n\n//# sourceURL=webpack:///./src/config/index.ts?");

/***/ }),

/***/ "./src/controllers/auth.ts":
/*!*********************************!*\
  !*** ./src/controllers/auth.ts ***!
  \*********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\nObject.defineProperty(exports, \"__esModule\", { value: true });\nconst _1 = __webpack_require__(/*! ./ */ \"./src/controllers/index.ts\");\nconst services_1 = __webpack_require__(/*! ../services */ \"./src/services/index.ts\");\nconst User_1 = __webpack_require__(/*! ../models/User */ \"./src/models/User.ts\");\nexports.AuthController = {\n    login: function (req, res, next) {\n        let credential = {\n            username: req.body.username,\n            password: req.body.password\n        };\n        if (!credential.username || !credential.password)\n            return _1.ErrorController.error401_empty(req, res, next);\n        services_1.AuthServices.authenticateCredential(credential).then((result) => {\n            return res.json(result);\n        }, () => {\n            return _1.ErrorController.error401_invalid(req, res, next);\n        });\n    },\n    signin: function (req, res, next) {\n        let credential = {\n            username: req.body.username,\n            password: req.body.password,\n            passwordConfirmation: req.body.passwordConfirmation\n        };\n        if (!credential.username || !credential.password || !credential.passwordConfirmation)\n            return _1.ErrorController.error401_empty(req, res, next);\n        if (credential.password !== credential.passwordConfirmation)\n            return _1.ErrorController.error401_invalid(req, res, next);\n        services_1.AuthServices.signin(credential).then((result) => {\n            return res.json(result);\n        }, () => {\n            return _1.ErrorController.error401_invalid(req, res, next);\n        });\n    },\n    validateUser: (key) => {\n        return new User_1.User(null);\n    }\n};\n\n\n//# sourceURL=webpack:///./src/controllers/auth.ts?");

/***/ }),

/***/ "./src/controllers/error.ts":
/*!**********************************!*\
  !*** ./src/controllers/error.ts ***!
  \**********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\nObject.defineProperty(exports, \"__esModule\", { value: true });\nconst _ = __webpack_require__(/*! lodash */ \"lodash\");\nconst translations_1 = __webpack_require__(/*! ../translations */ \"./src/translations/index.ts\");\nexports.ErrorController = {\n    error401_invalid: (req, res, next) => {\n        console.log('error401_invalid');\n        return res.json({\n            status: 401,\n            message: translations_1.Translation.INVALID_CREDENTIALS\n        });\n    },\n    error401_empty: (req, res, next) => {\n        console.log('error401_empty');\n        return res.json({\n            status: 401,\n            message: translations_1.Translation.EMPTY_CREDENTIALS\n        });\n    },\n    error403: (req, res, next) => {\n        console.log('error403');\n        return res.json({\n            status: 403,\n            message: translations_1.Translation.UNAUTHORIZED_ACCESS\n        });\n    },\n    error404: (req, res, next) => {\n        console.log('error404');\n        return res.json({\n            status: 404,\n            message: translations_1.Translation.PAGE_NOT_FOUND\n        });\n    },\n    error500: (req, res, next) => {\n        console.log('error500');\n        return res.json({\n            status: 500,\n            message: translations_1.Translation.ERROR_SERVER\n        });\n    },\n    errorHandler: (err, req, res) => {\n        console.log('errorHandler');\n        const message = {\n            status: !_.isNil(err.status) ? err.status : 500,\n            error: !_.isNil(err.message) ? err.message : '',\n            stack: !_.isNil(err.stack) ? err.stack : ''\n        };\n        return res.status(message.status).json(message);\n    }\n};\n\n\n//# sourceURL=webpack:///./src/controllers/error.ts?");

/***/ }),

/***/ "./src/controllers/index.ts":
/*!**********************************!*\
  !*** ./src/controllers/index.ts ***!
  \**********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\nfunction __export(m) {\n    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];\n}\nObject.defineProperty(exports, \"__esModule\", { value: true });\n__export(__webpack_require__(/*! ./error */ \"./src/controllers/error.ts\"));\n__export(__webpack_require__(/*! ./auth */ \"./src/controllers/auth.ts\"));\n__export(__webpack_require__(/*! ./user */ \"./src/controllers/user.ts\"));\n\n\n//# sourceURL=webpack:///./src/controllers/index.ts?");

/***/ }),

/***/ "./src/controllers/user.ts":
/*!*********************************!*\
  !*** ./src/controllers/user.ts ***!
  \*********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\nObject.defineProperty(exports, \"__esModule\", { value: true });\nconst services_1 = __webpack_require__(/*! ../services */ \"./src/services/index.ts\");\nconst _1 = __webpack_require__(/*! ./ */ \"./src/controllers/index.ts\");\nexports.UserController = {\n    createUser: function (req, res, next) {\n        return services_1.UserServices.insertOne(req.body);\n    },\n    getUsers: function (req, res, next) {\n        return services_1.UserServices.findAll().then(result => {\n            res.json(result);\n        }, () => {\n            return _1.ErrorController.error500(req, res, next);\n        });\n    },\n    getUser: function (req, res, next) {\n        return services_1.UserServices.findOneByUsername(req.params.username).then(result => {\n            res.json(result);\n        }, () => {\n            return _1.ErrorController.error500(req, res, next);\n        });\n    },\n    updateUser: function (req, res, next) {\n        return services_1.UserServices.findOneAndUpdateByUsername(req.params.username, req.body).then(result => {\n            res.json(result);\n        }, () => {\n            return _1.ErrorController.error500(req, res, next);\n        });\n    },\n    deleteUser: function (req, res, next) {\n        return services_1.UserServices.findOneAndDeleteByUsername(req.params.username).then(result => {\n            res.json(result);\n        }, () => {\n            return _1.ErrorController.error500(req, res, next);\n        });\n    }\n};\n\n\n//# sourceURL=webpack:///./src/controllers/user.ts?");

/***/ }),

/***/ "./src/data-access/database.ts":
/*!*************************************!*\
  !*** ./src/data-access/database.ts ***!
  \*************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\nObject.defineProperty(exports, \"__esModule\", { value: true });\nconst mongoDb = __webpack_require__(/*! mongodb */ \"mongodb\");\nconst config_1 = __webpack_require__(/*! ../config */ \"./src/config/index.ts\");\nexports.DatabaseDataAccess = {\n    isConnected: () => {\n        return new Promise((resolve, reject) => {\n            mongoDb.connect(config_1.Config.database.path, (err, database) => {\n                if (err)\n                    reject(false);\n                resolve(true);\n            });\n        });\n    },\n    insertMany: (collection, data) => {\n        return new Promise((resolve, reject) => {\n            mongoDb.MongoClient.connect(config_1.Config.database.path, (err, database) => {\n                if (err) {\n                    reject(err);\n                }\n                else {\n                    database.db(config_1.Config.database.db).collection(collection).insertMany(data).then(result => {\n                        resolve(data);\n                        database.close();\n                    }, e => {\n                        reject(e);\n                    });\n                }\n            });\n        });\n    },\n    insertOne: (collection, data) => {\n        return new Promise((resolve, reject) => {\n            mongoDb.MongoClient.connect(config_1.Config.database.path, (err, database) => {\n                if (err) {\n                    reject(err);\n                }\n                else {\n                    database.db(config_1.Config.database.db).collection(collection).insertOne(data).then(result => {\n                        resolve(result);\n                        database.close();\n                    }, e => {\n                        reject(e);\n                    });\n                }\n            });\n        });\n    },\n    insertOneIfNotExist: (collection, filter, data) => {\n        return new Promise((resolve, reject) => {\n            mongoDb.MongoClient.connect(config_1.Config.database.path, (err, database) => {\n                if (err) {\n                    reject(err);\n                }\n                else {\n                    database.db(config_1.Config.database.db).collection(collection).findOne(filter).then(findResult => {\n                        if (!findResult) {\n                            database.db(config_1.Config.database.db).collection(collection).insertOne(data).then(() => {\n                                resolve(data);\n                            }, e => {\n                                reject(e);\n                            });\n                        }\n                        else {\n                            reject({\n                                error: 'data already exist',\n                                data: data\n                            });\n                        }\n                    }, e => {\n                        reject(e);\n                    });\n                }\n            });\n        });\n    },\n    find: (collection) => {\n        return new Promise((resolve, reject) => {\n            mongoDb.MongoClient.connect(config_1.Config.database.path, (err, database) => {\n                if (err) {\n                    reject(err);\n                }\n                else {\n                    database.db(config_1.Config.database.db).collection(collection).find().toArray((error, result) => {\n                        if (error)\n                            reject(error);\n                        resolve(result);\n                        database.close();\n                    });\n                }\n            });\n        });\n    },\n    findOne: (collection, filter) => {\n        return new Promise((resolve, reject) => {\n            mongoDb.MongoClient.connect(config_1.Config.database.path, (err, database) => {\n                if (err) {\n                    reject(err);\n                }\n                else {\n                    database.db(config_1.Config.database.db).collection(collection).findOne(filter).then(result => {\n                        resolve(result);\n                        database.close();\n                    }, e => {\n                        reject(e);\n                    });\n                }\n            });\n        });\n    },\n    findOneAndUpdate: (collection, filter, update) => {\n        return new Promise((resolve, reject) => {\n            mongoDb.MongoClient.connect(config_1.Config.database.path, (err, database) => {\n                if (err) {\n                    reject(err);\n                }\n                else {\n                    database.db(config_1.Config.database.db).collection(collection).findOneAndUpdate(filter, { $set: update }).then(result => {\n                        resolve(result);\n                        database.close();\n                    }, e => {\n                        reject(e);\n                    });\n                }\n            });\n        });\n    },\n    findOneAndUpdateOrInsert: (collection, filter, update) => {\n        return new Promise((resolve, reject) => {\n            mongoDb.MongoClient.connect(config_1.Config.database.path, (err, database) => {\n                if (err) {\n                    reject(err);\n                }\n                else {\n                    database.db(config_1.Config.database.db).collection(collection).findOneAndUpdate(filter, { $set: update }).then(result => {\n                        if (result) {\n                            resolve(update);\n                        }\n                        else {\n                            database.db(config_1.Config.database.db).collection(collection).insertOne(update).then(() => {\n                                resolve(update);\n                            });\n                        }\n                        database.close();\n                    }, e => {\n                        reject(e);\n                    });\n                }\n            });\n        });\n    },\n    findOneAndDelete: (collection, filter) => {\n        return new Promise((resolve, reject) => {\n            mongoDb.MongoClient.connect(config_1.Config.database.path, (err, database) => {\n                if (err) {\n                    reject(err);\n                }\n                else {\n                    database.db(config_1.Config.database.db).collection(collection).findOneAndDelete(filter).then(result => {\n                        resolve(result);\n                        database.close();\n                    }, e => {\n                        reject(e);\n                    });\n                }\n            });\n        });\n    }\n};\n\n\n//# sourceURL=webpack:///./src/data-access/database.ts?");

/***/ }),

/***/ "./src/data-access/index.ts":
/*!**********************************!*\
  !*** ./src/data-access/index.ts ***!
  \**********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\nfunction __export(m) {\n    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];\n}\nObject.defineProperty(exports, \"__esModule\", { value: true });\n__export(__webpack_require__(/*! ./database */ \"./src/data-access/database.ts\"));\n__export(__webpack_require__(/*! ./json */ \"./src/data-access/json.ts\"));\n\n\n//# sourceURL=webpack:///./src/data-access/index.ts?");

/***/ }),

/***/ "./src/data-access/json.ts":
/*!*********************************!*\
  !*** ./src/data-access/json.ts ***!
  \*********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\nObject.defineProperty(exports, \"__esModule\", { value: true });\nconst fs = __webpack_require__(/*! fs */ \"fs\");\nconst _ = __webpack_require__(/*! lodash */ \"lodash\");\nexports.JsonDataAccess = {\n    writeJsonFile: (path, data) => {\n        return new Promise((resolve, reject) => {\n            JSON.stringify(data) ? reject('Expected json content') : null;\n            let folderPath = data.slice(0, data.length - 1);\n            !fs.existsSync(folderPath) ? fs.mkdirSync(folderPath) : null;\n            fs.writeFile(path + '.json', JSON.stringify(data, null, 4), (err) => {\n                err ? reject(err) : resolve(data);\n            });\n        });\n    },\n    readFile: (path) => {\n        return new Promise((resolve, reject) => {\n            let fileFormat = _.last(path.split('.'));\n            fileFormat !== 'json' ? reject('This is not \\'.json\\' file') : null;\n            fs.readFile(path, 'utf8', (err, result) => {\n                if (err) {\n                    reject(err);\n                }\n                else {\n                    !JSON.stringify(result) ? reject('Expected json content') : null;\n                    resolve(result);\n                }\n            });\n        });\n    }\n};\n\n\n//# sourceURL=webpack:///./src/data-access/json.ts?");

/***/ }),

/***/ "./src/enums/index.ts":
/*!****************************!*\
  !*** ./src/enums/index.ts ***!
  \****************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\nfunction __export(m) {\n    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];\n}\nObject.defineProperty(exports, \"__esModule\", { value: true });\n__export(__webpack_require__(/*! ./language */ \"./src/enums/language.ts\"));\n__export(__webpack_require__(/*! ./user-role */ \"./src/enums/user-role.ts\"));\n\n\n//# sourceURL=webpack:///./src/enums/index.ts?");

/***/ }),

/***/ "./src/enums/language.ts":
/*!*******************************!*\
  !*** ./src/enums/language.ts ***!
  \*******************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\nObject.defineProperty(exports, \"__esModule\", { value: true });\nexports.LanguageEnums = {\n    EN_US: 0,\n    ZH_CN: 1\n};\n\n\n//# sourceURL=webpack:///./src/enums/language.ts?");

/***/ }),

/***/ "./src/enums/user-role.ts":
/*!********************************!*\
  !*** ./src/enums/user-role.ts ***!
  \********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\nObject.defineProperty(exports, \"__esModule\", { value: true });\nexports.UserRoleEnums = {\n    PUBLIC: 0,\n    MEMBER: 1,\n    MANAGER: 2,\n    ADMIN: 3\n};\n\n\n//# sourceURL=webpack:///./src/enums/user-role.ts?");

/***/ }),

/***/ "./src/middlewares/corsHeader.ts":
/*!***************************************!*\
  !*** ./src/middlewares/corsHeader.ts ***!
  \***************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\nObject.defineProperty(exports, \"__esModule\", { value: true });\nexports.CorsHeaderMiddleware = {\n    enableCORS: function (req, res, next) {\n        res.header('Access-Control-Allow-Origin', \"*\");\n        res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');\n        res.header('Access-Control-Allow-Headers', 'Content-Type');\n        next();\n    }\n};\n\n\n//# sourceURL=webpack:///./src/middlewares/corsHeader.ts?");

/***/ }),

/***/ "./src/middlewares/index.ts":
/*!**********************************!*\
  !*** ./src/middlewares/index.ts ***!
  \**********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\nfunction __export(m) {\n    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];\n}\nObject.defineProperty(exports, \"__esModule\", { value: true });\n__export(__webpack_require__(/*! ./corsHeader */ \"./src/middlewares/corsHeader.ts\"));\n__export(__webpack_require__(/*! ./requestValidation */ \"./src/middlewares/requestValidation.ts\"));\n\n\n//# sourceURL=webpack:///./src/middlewares/index.ts?");

/***/ }),

/***/ "./src/middlewares/requestValidation.ts":
/*!**********************************************!*\
  !*** ./src/middlewares/requestValidation.ts ***!
  \**********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\nObject.defineProperty(exports, \"__esModule\", { value: true });\nconst moment = __webpack_require__(/*! moment */ \"moment\");\nconst jwt = __webpack_require__(/*! jwt-simple */ \"jwt-simple\");\nconst config_1 = __webpack_require__(/*! ../config */ \"./src/config/index.ts\");\nconst controllers_1 = __webpack_require__(/*! ../controllers */ \"./src/controllers/index.ts\");\nconst enums_1 = __webpack_require__(/*! ../enums */ \"./src/enums/index.ts\");\nconst translations_1 = __webpack_require__(/*! ../translations */ \"./src/translations/index.ts\");\nexports.RequestValidationMiddleware = (req, res, next) => {\n    let token = (req.body && req.body.access_token) || (req.query && req.query.access_token) || req.headers['x-access-token'], key = (req.body && req.body.x_key) || (req.query && req.query.x_key) || req.headers['x-key'];\n    if (token && key) {\n        try {\n            let decoded = jwt.decode(token, config_1.Config.token.secret);\n            if (decoded.exp <= moment.utc()) {\n                return res.status(400)\n                    .json({\n                    \"status\": 400,\n                    \"message\": translations_1.Translation.EXPIRED_TOKEN\n                });\n            }\n            let dbUser = controllers_1.AuthController.validateUser(key);\n            if (dbUser) {\n                if ((req.url.indexOf(enums_1.UserRoleEnums.ADMIN) > -1 && dbUser.role == enums_1.UserRoleEnums.ADMIN) ||\n                    (req.url.indexOf(enums_1.UserRoleEnums.ADMIN) < 0 && req.url.indexOf(config_1.Config.api.path) >= 0)) {\n                    next();\n                }\n                else {\n                    return res.status(403)\n                        .json({\n                        \"status\": 403,\n                        \"message\": translations_1.Translation.UNAUTHORIZED_ACCESS\n                    });\n                }\n            }\n            else {\n                return res.status(401)\n                    .json({\n                    \"status\": 401,\n                    \"message\": translations_1.Translation.INVALID_USER\n                });\n            }\n        }\n        catch (err) {\n            return res.status(500)\n                .json({\n                \"status\": 500,\n                \"message\": translations_1.Translation.SOMETHING_WENT_WRONG,\n                \"error\": err\n            });\n        }\n    }\n    else {\n        return res.status(401)\n            .json({\n            \"status\": 401,\n            \"message\": translations_1.Translation.INVALID_TOKEN_OR_KEY\n        });\n    }\n};\n\n\n//# sourceURL=webpack:///./src/middlewares/requestValidation.ts?");

/***/ }),

/***/ "./src/models/Password.ts":
/*!********************************!*\
  !*** ./src/models/Password.ts ***!
  \********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\nObject.defineProperty(exports, \"__esModule\", { value: true });\nconst _ = __webpack_require__(/*! lodash */ \"lodash\");\nconst crypto = __webpack_require__(/*! crypto */ \"crypto\");\nclass Password {\n    constructor(data) {\n        this.iterations = !_.isNil(data) && !_.isNil(data.iterations) ? data.iterations : Math.floor(Math.random() * 1000);\n        this.salt = !_.isNil(data) && !_.isNil(data.salt) ? data.salt : this.generateSalt();\n        this.username = !_.isNil(data) && !_.isNil(data.username) ? data.username : '';\n        this.password = !_.isNil(data) && !_.isNil(data.password) ? data.password : '';\n        this.passwordAttempt = !_.isNil(data) && !_.isNil(data.passwordAttempt) ? data.passwordAttempt : '';\n        this.hash = !_.isNil(data) && !_.isNil(data.hash) ? data.hash : '';\n    }\n    ;\n    generateSalt() {\n        return crypto.randomBytes(this.iterations).toString('base64');\n    }\n    ;\n    hashPassword() {\n        return new Promise((resolve, reject) => {\n            crypto.pbkdf2(this.password, this.salt, this.iterations, 512, 'sha512', (err, result) => {\n                if (err)\n                    reject(err);\n                this.hash = result.toString('base64');\n                resolve(result.toString('base64'));\n            });\n        });\n    }\n    ;\n    comparePassword() {\n        return new Promise((resolve, reject) => {\n            crypto.pbkdf2(this.passwordAttempt, this.salt, this.iterations, 512, 'sha512', (err, result) => {\n                if (err)\n                    reject(err);\n                if (_.isEmpty(this.hash))\n                    console.log('Password hash is empty');\n                resolve(this.hash === result.toString('base64'));\n            });\n        });\n    }\n}\nexports.Password = Password;\n\n\n//# sourceURL=webpack:///./src/models/Password.ts?");

/***/ }),

/***/ "./src/models/Token.ts":
/*!*****************************!*\
  !*** ./src/models/Token.ts ***!
  \*****************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\nObject.defineProperty(exports, \"__esModule\", { value: true });\nconst moment = __webpack_require__(/*! moment */ \"moment\");\nconst jwt = __webpack_require__(/*! jwt-simple */ \"jwt-simple\");\nconst _ = __webpack_require__(/*! lodash */ \"lodash\");\nconst config_1 = __webpack_require__(/*! ../config */ \"./src/config/index.ts\");\nconst data_access_1 = __webpack_require__(/*! ../data-access */ \"./src/data-access/index.ts\");\nclass Token {\n    constructor(data) {\n        !_.isNil(data) && !_.isNil(data.username) ? this.generate(data) : null;\n    }\n    generate(data) {\n        this.username = data.username;\n        this.token = jwt.encode({ exp: this.expires }, config_1.Config.token.secret);\n        this.creation = moment.utc().format();\n        this.expiration = moment.utc().add(config_1.Config.token.expiration, 'days').format();\n        const filter = { username: this.username };\n        return data_access_1.DatabaseDataAccess.findOneAndUpdate(config_1.Config.database.collections.tokens, filter, this);\n    }\n}\nexports.Token = Token;\n\n\n//# sourceURL=webpack:///./src/models/Token.ts?");

/***/ }),

/***/ "./src/models/User.ts":
/*!****************************!*\
  !*** ./src/models/User.ts ***!
  \****************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\nObject.defineProperty(exports, \"__esModule\", { value: true });\nconst _ = __webpack_require__(/*! lodash */ \"lodash\");\nconst enums_1 = __webpack_require__(/*! ../enums */ \"./src/enums/index.ts\");\nclass User {\n    constructor(data) {\n        this.username = !_.isNil(data) && !_.isNil(data.username) ? data.username : '';\n        this.firstname = !_.isNil(data) && !_.isNil(data.firstname) ? data.firstname : '';\n        this.lastname = !_.isNil(data) && !_.isNil(data.lastname) ? data.lastname : '';\n        this.birthday = !_.isNil(data) && !_.isNil(data.birthday) ? data.birthday : '';\n        this.address = !_.isNil(data) && !_.isNil(data.address) ? data.address : '';\n        this.picture = !_.isNil(data) && !_.isNil(data.picture) ? data.picture : '';\n        this.language = !_.isNil(data) && !_.isNil(data.language) ? data.language : enums_1.LanguageEnums.EN_US;\n        this.role = !_.isNil(data) && !_.isNil(data.role) ? data.role : enums_1.UserRoleEnums.PUBLIC;\n    }\n}\nexports.User = User;\n;\n\n\n//# sourceURL=webpack:///./src/models/User.ts?");

/***/ }),

/***/ "./src/models/index.ts":
/*!*****************************!*\
  !*** ./src/models/index.ts ***!
  \*****************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\nfunction __export(m) {\n    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];\n}\nObject.defineProperty(exports, \"__esModule\", { value: true });\n__export(__webpack_require__(/*! ./User */ \"./src/models/User.ts\"));\n__export(__webpack_require__(/*! ./Password */ \"./src/models/Password.ts\"));\n__export(__webpack_require__(/*! ./Token */ \"./src/models/Token.ts\"));\n\n\n//# sourceURL=webpack:///./src/models/index.ts?");

/***/ }),

/***/ "./src/routes/index.ts":
/*!*****************************!*\
  !*** ./src/routes/index.ts ***!
  \*****************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\nObject.defineProperty(exports, \"__esModule\", { value: true });\nconst express = __webpack_require__(/*! express */ \"express\");\nconst config_1 = __webpack_require__(/*! ../config */ \"./src/config/index.ts\");\nconst middlewares_1 = __webpack_require__(/*! ../middlewares */ \"./src/middlewares/index.ts\");\nconst controllers_1 = __webpack_require__(/*! ../controllers */ \"./src/controllers/index.ts\");\nconst baseUrl = config_1.Config.api.path;\nexports.Routes = express.Router()\n    .all('/*', [middlewares_1.CorsHeaderMiddleware.enableCORS])\n    .get('/', (req, res) => {\n    return res.redirect(baseUrl + '/');\n})\n    .post(baseUrl + '/login', controllers_1.AuthController.login)\n    .post(baseUrl + '/signin', controllers_1.AuthController.signin)\n    .all(baseUrl + '/admin', [middlewares_1.RequestValidationMiddleware])\n    .get(baseUrl + '/admin/users', controllers_1.UserController.getUsers)\n    .post(baseUrl + '/admin/users', controllers_1.UserController.createUser)\n    .get(baseUrl + '/admin/user/:username', controllers_1.UserController.getUser)\n    .put(baseUrl + '/admin/user/:username', controllers_1.UserController.updateUser)\n    .delete(baseUrl + '/admin/user/:username', controllers_1.UserController.deleteUser)\n    .use(controllers_1.ErrorController.error404)\n    .use(controllers_1.ErrorController.errorHandler);\n\n\n//# sourceURL=webpack:///./src/routes/index.ts?");

/***/ }),

/***/ "./src/services/auth.ts":
/*!******************************!*\
  !*** ./src/services/auth.ts ***!
  \******************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\nObject.defineProperty(exports, \"__esModule\", { value: true });\nconst config_1 = __webpack_require__(/*! ../config */ \"./src/config/index.ts\");\nconst data_access_1 = __webpack_require__(/*! ../data-access */ \"./src/data-access/index.ts\");\nconst models_1 = __webpack_require__(/*! ../models */ \"./src/models/index.ts\");\nexports.AuthServices = {\n    authenticateCredential: (data) => {\n        return new Promise((resolve, reject) => {\n            data_access_1.DatabaseDataAccess.findOne(config_1.Config.database.collections.passwords, { username: data.username }).then(passwordResult => {\n                if (!passwordResult)\n                    reject('invalid credentials');\n                let password = new models_1.Password(passwordResult);\n                password.passwordAttempt = data.password;\n                password.comparePassword().then(compareResult => {\n                    if (!compareResult)\n                        reject('invalid credentials');\n                    let token = new models_1.Token(data);\n                    data_access_1.DatabaseDataAccess.findOneAndUpdateOrInsert(config_1.Config.database.collections.tokens, { username: data.username }, token).then(tokenResult => {\n                        resolve(tokenResult);\n                    }, e => {\n                        reject(e);\n                    });\n                }, e => {\n                    reject(e);\n                });\n            }, e => {\n                reject(e);\n            });\n        });\n    },\n    signin: (data) => {\n        return new Promise((resolve, reject) => {\n            let user = new models_1.User(data);\n            data_access_1.DatabaseDataAccess.insertOneIfNotExist(config_1.Config.database.collections.users, { username: user.username }, user).then(() => {\n                let password = new models_1.Password(data);\n                password.password = null;\n                data_access_1.DatabaseDataAccess.insertOneIfNotExist(config_1.Config.database.collections.passwords, { username: password.username }, password).then(() => {\n                    let token = new models_1.Token(data);\n                    data_access_1.DatabaseDataAccess.insertOneIfNotExist(config_1.Config.database.collections.tokens, { username: data.username }, token).then(tokenResult => {\n                        resolve(tokenResult);\n                    }, e => {\n                        reject(e);\n                    });\n                }, e => {\n                    reject(e);\n                });\n            }, e => {\n                reject(e);\n            });\n        });\n    }\n};\n\n\n//# sourceURL=webpack:///./src/services/auth.ts?");

/***/ }),

/***/ "./src/services/index.ts":
/*!*******************************!*\
  !*** ./src/services/index.ts ***!
  \*******************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\nfunction __export(m) {\n    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];\n}\nObject.defineProperty(exports, \"__esModule\", { value: true });\n__export(__webpack_require__(/*! ./auth */ \"./src/services/auth.ts\"));\n__export(__webpack_require__(/*! ./user */ \"./src/services/user.ts\"));\n\n\n//# sourceURL=webpack:///./src/services/index.ts?");

/***/ }),

/***/ "./src/services/user.ts":
/*!******************************!*\
  !*** ./src/services/user.ts ***!
  \******************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\nObject.defineProperty(exports, \"__esModule\", { value: true });\nconst config_1 = __webpack_require__(/*! ../config */ \"./src/config/index.ts\");\nconst data_access_1 = __webpack_require__(/*! ../data-access */ \"./src/data-access/index.ts\");\nconst models_1 = __webpack_require__(/*! ../models */ \"./src/models/index.ts\");\nexports.UserServices = {\n    insertOne: function (data) {\n        return new Promise((resolve, reject) => {\n            if (!data)\n                reject('empty data');\n            let user = new models_1.User(data);\n            data_access_1.DatabaseDataAccess.insertOneIfNotExist(config_1.Config.database.collections.users, { username: user.username }, user).then(result => {\n                let password = new models_1.Password(data);\n                password.hashPassword().then(() => {\n                    if (result)\n                        data_access_1.DatabaseDataAccess.insertOneIfNotExist(config_1.Config.database.collections.passwords, { username: password.username }, password).then(result => {\n                            resolve(user);\n                        }, e => {\n                            console.log(e);\n                        });\n                });\n            }, e => {\n                console.log(e);\n            });\n        });\n    },\n    findAll: function () {\n        return data_access_1.DatabaseDataAccess.find(config_1.Config.database.collections.users);\n    },\n    findOneByUsername: function (username) {\n        return data_access_1.DatabaseDataAccess.findOne(config_1.Config.database.collections.users, { username: username });\n    },\n    findOneAndUpdateByUsername: function (username, update) {\n        return data_access_1.DatabaseDataAccess.findOneAndUpdate(config_1.Config.database.collections.users, { username: username }, update);\n    },\n    findOneAndDeleteByUsername: function (username) {\n        return data_access_1.DatabaseDataAccess.findOneAndDelete(config_1.Config.database.collections.users, { username: username });\n    }\n};\n\n\n//# sourceURL=webpack:///./src/services/user.ts?");

/***/ }),

/***/ "./src/translations/index.ts":
/*!***********************************!*\
  !*** ./src/translations/index.ts ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\nObject.defineProperty(exports, \"__esModule\", { value: true });\nexports.Translation = {\n    EXPIRED_TOKEN: 'Token expired',\n    UNAUTHORIZED_ACCESS: 'Access not authorized',\n    INVALID_USER: 'Invalid User',\n    INVALID_TOKEN_OR_KEY: 'Invalid Token or Key',\n    INVALID_CREDENTIALS: 'Invalid credentials',\n    EMPTY_CREDENTIALS: 'Empty credentials',\n    SOMETHING_WENT_WRONG: 'Oops something went wrong',\n    ERROR_SERVER: 'Error server',\n    PAGE_NOT_FOUND: 'Page not found'\n};\n\n\n//# sourceURL=webpack:///./src/translations/index.ts?");

/***/ }),

/***/ "body-parser":
/*!******************************!*\
  !*** external "body-parser" ***!
  \******************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"body-parser\");\n\n//# sourceURL=webpack:///external_%22body-parser%22?");

/***/ }),

/***/ "cookie-parser":
/*!********************************!*\
  !*** external "cookie-parser" ***!
  \********************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"cookie-parser\");\n\n//# sourceURL=webpack:///external_%22cookie-parser%22?");

/***/ }),

/***/ "crypto":
/*!*************************!*\
  !*** external "crypto" ***!
  \*************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"crypto\");\n\n//# sourceURL=webpack:///external_%22crypto%22?");

/***/ }),

/***/ "debug":
/*!************************!*\
  !*** external "debug" ***!
  \************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"debug\");\n\n//# sourceURL=webpack:///external_%22debug%22?");

/***/ }),

/***/ "express":
/*!**************************!*\
  !*** external "express" ***!
  \**************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"express\");\n\n//# sourceURL=webpack:///external_%22express%22?");

/***/ }),

/***/ "fs":
/*!*********************!*\
  !*** external "fs" ***!
  \*********************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"fs\");\n\n//# sourceURL=webpack:///external_%22fs%22?");

/***/ }),

/***/ "helmet":
/*!*************************!*\
  !*** external "helmet" ***!
  \*************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"helmet\");\n\n//# sourceURL=webpack:///external_%22helmet%22?");

/***/ }),

/***/ "http":
/*!***********************!*\
  !*** external "http" ***!
  \***********************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"http\");\n\n//# sourceURL=webpack:///external_%22http%22?");

/***/ }),

/***/ "jwt-simple":
/*!*****************************!*\
  !*** external "jwt-simple" ***!
  \*****************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"jwt-simple\");\n\n//# sourceURL=webpack:///external_%22jwt-simple%22?");

/***/ }),

/***/ "lodash":
/*!*************************!*\
  !*** external "lodash" ***!
  \*************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"lodash\");\n\n//# sourceURL=webpack:///external_%22lodash%22?");

/***/ }),

/***/ "moment":
/*!*************************!*\
  !*** external "moment" ***!
  \*************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"moment\");\n\n//# sourceURL=webpack:///external_%22moment%22?");

/***/ }),

/***/ "mongodb":
/*!**************************!*\
  !*** external "mongodb" ***!
  \**************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"mongodb\");\n\n//# sourceURL=webpack:///external_%22mongodb%22?");

/***/ }),

/***/ "morgan":
/*!*************************!*\
  !*** external "morgan" ***!
  \*************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"morgan\");\n\n//# sourceURL=webpack:///external_%22morgan%22?");

/***/ })

/******/ })));