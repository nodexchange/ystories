/*! Copyright 2018 Oath Inc. */
/**
 * @preserve
 * CRAFT HTML Banner format template v{{Format.version}}
 */
(function() {
  var adConfig = {
    Integrator: {
      partnerId: '{{Integrator.partnerId}}',
      previewMode: {{Integrator.previewMode}}
    },
    AdServer: {
      cacheBuster: '{{AdServer.cacheBuster}}',
      clickPixel: '{{AdServer.clickPixel}}',
      clickRedirect: '{{AdServer.clickRedirect}}',
      deliveryGroupId: '{{AdServer.deliveryGroupId}}',
      networkId: '{{AdServer.networkId}}',
      name: '{{AdServer.name}}',
      proto: '{{AdServer.proto}}',
      region: '{{AdServer.region}}',
      campaignId: '{{AdServer.campaignId}}',
      placementId: '{{AdServer.placementId}}',
      creativeId: '{{AdServer.creativeId}}',
      downloadedImpressionPixel: '{{AdServer.downloadedImpressionPixel}}'
    },
    Publisher: {
      clickRedirect: '{{Publisher.clickRedirect}}',
      clickPixel: '{{Publisher.clickPixel}}'
    },
    Platform: {
      pixelServer: {
        host: {
          EU: '{{Platform.pixelServer.host.EU}}',
          US: '{{Platform.pixelServer.host.US}}'
        },
        path: {
          simple: '{{Platform.pixelServer.path.simple}}'
        }
      },
      cdn: {
        host: '{{Platform.cdnHost}}'
      }
    },
    Regs: {
      gdpr: {
        applies: '{{Regs.gdpr.applies}}',
        consent: '{{Regs.gdpr.consent}}'
      }
    },
    Format: {
      id: '{{Format.id}}',
      version: '{{Format.version}}',
      library: {
        url: '{{Library "Delivr-1.x.x"}}',
        version: '{{Library "Delivr-1.x.x" output="version"}}'
      }
    },
    Creative: {
      assetPath: '{{Creative.baseDir}}',
      id: '{{Creative.id}}',
      content: {{ContextToJson content}},
      containers: {
        placement: {
          renderOn: 'serve',
          states: {
            'default': {
              width: {{content.htmlFile.size.width}},
              height: {{content.htmlFile.size.height}}
            }
          },
          content: '{{content.htmlFile.name}}',
          'default': {
            content: '{{content.backupImage.name}}'
          }
        }
      },
      clicks: {
        {{#each Creative.clicks}}
        '{{@key}}': {
          url: '{{url}}'
        }{{#unless @last}},{{/unless}}
        {{/each}}
      },
      events: {
        {{#each Creative.events}}
        '{{@key}}': {
          trackOnce: {{trackOnce}},
          interaction: {{interaction}}
        }{{#unless @last}},{{/unless}}
        {{/each}}
      }
    },
    DeliveryGroups: {{ContextToJson DeliveryGroups}}
  };

  var adManagerVersionsName = 'richAdManagerVersions';
  var adManagerName = 'richAdManager';
  var adConfigQueueName = 'richAdConfigQueue';
  var delivrVersion = adConfig.Format.library.version;

  var com = window.com = window.com || {};
  com.oath = com.oath || {};
  com.oath.craft = com.oath.craft || {};
  var ns = com.oath.craft.delivery = com.oath.craft.delivery || {};
  var versionedNS = ns['v' + delivrVersion] = ns['v' + delivrVersion] || {};

  // Current support for tag is for 1AS only.
  var where = document.getElementById('_ADDCP(c.tagid:-1)_');
  if (!where) {
    where = document.getElementsByTagName('script');
    where = where[where.length - 1];
  }

  var anchorDivId = 'craftAnchor_' + adConfig.AdServer.cacheBuster;
  adConfig.anchorDivId = anchorDivId;
  var anchorDiv = document.createElement('div');
  anchorDiv.id = anchorDivId;
  where.parentNode.insertBefore(anchorDiv, where);

  var adManager = versionedNS[adManagerName];
  if (!adManager) {
    var adConfigQueue = versionedNS[adConfigQueueName] = versionedNS[adConfigQueueName] || [];
    adConfigQueue.push(adConfig);

    var adManagerVersions = ns[adManagerVersionsName];
    if (!adManagerVersions || adManagerVersions.indexOf(delivrVersion) === -1) {
      adManagerVersions = ns[adManagerVersionsName] = ns[adManagerVersionsName] || [];
      adManagerVersions.push(delivrVersion);

      var deliveryLibScript = document.createElement('script');
      deliveryLibScript.src = adConfig.Format.library.url;
      where.parentNode.insertBefore(deliveryLibScript, where);
    }
  } else {
    adManager.registerAd(adConfig);
  }
})();