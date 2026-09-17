import assert from "node:assert/strict";
import { describe, it } from "node:test";
import {
  adsConfigured,
  adsEnabledAtBuild,
  adsTxtBody,
  getAdSlotId,
  getAdsenseClientId,
  publisherIdFromClient,
} from "./ads";

function withEnv(vars: Record<string, string | undefined>, run: () => void) {
  const prev = new Map<string, string | undefined>();
  for (const [key, value] of Object.entries(vars)) {
    prev.set(key, process.env[key]);
    if (value === undefined) delete process.env[key];
    else process.env[key] = value;
  }
  try {
    run();
  } finally {
    for (const [key, value] of prev) {
      if (value === undefined) delete process.env[key];
      else process.env[key] = value;
    }
  }
}

describe("ads gate", () => {
  it("is off unless the flag is the string true", () => {
    withEnv({ NEXT_PUBLIC_ADS_ENABLED: undefined }, () => {
      assert.equal(adsEnabledAtBuild(), false);
    });
    withEnv({ NEXT_PUBLIC_ADS_ENABLED: "false" }, () => {
      assert.equal(adsEnabledAtBuild(), false);
    });
    withEnv({ NEXT_PUBLIC_ADS_ENABLED: "true" }, () => {
      assert.equal(adsEnabledAtBuild(), true);
    });
  });

  it("requires both the flag and a client id to configure chrome", () => {
    withEnv(
      { NEXT_PUBLIC_ADS_ENABLED: "true", NEXT_PUBLIC_ADSENSE_CLIENT_ID: undefined },
      () => {
        assert.equal(getAdsenseClientId(), null);
        assert.equal(adsConfigured(), false);
      },
    );
    withEnv(
      { NEXT_PUBLIC_ADS_ENABLED: undefined, NEXT_PUBLIC_ADSENSE_CLIENT_ID: "ca-pub-1" },
      () => {
        assert.equal(adsConfigured(), false);
      },
    );
    withEnv(
      { NEXT_PUBLIC_ADS_ENABLED: "true", NEXT_PUBLIC_ADSENSE_CLIENT_ID: "ca-pub-1" },
      () => {
        assert.equal(adsConfigured(), true);
      },
    );
  });

  it("reads optional slot ids from the static env names Next can inline", () => {
    withEnv(
      {
        NEXT_PUBLIC_ADSENSE_SLOT_LAYOUT: "111",
        NEXT_PUBLIC_ADSENSE_SLOT_SIDEBAR: " 222 ",
        NEXT_PUBLIC_ADSENSE_SLOT_FOOTER: undefined,
      },
      () => {
        assert.equal(getAdSlotId("layout"), "111");
        assert.equal(getAdSlotId("sidebar"), "222");
        assert.equal(getAdSlotId("footer"), undefined);
      },
    );
  });
});

describe("publisherIdFromClient", () => {
  it("accepts ca-pub and bare pub ids", () => {
    assert.equal(publisherIdFromClient("ca-pub-1234567890123456"), "pub-1234567890123456");
    assert.equal(publisherIdFromClient("pub-1234567890123456"), "pub-1234567890123456");
  });

  it("does not invent an id from empty or junk input", () => {
    assert.equal(publisherIdFromClient(""), null);
    assert.equal(publisherIdFromClient("not-a-publisher"), null);
  });
});

describe("adsTxtBody", () => {
  it("writes a comment template when ads are off", () => {
    const body = adsTxtBody("ca-pub-1234567890123456", false);
    assert.match(body, /^#/);
    assert.doesNotMatch(body, /^google\.com,/);
  });

  it("writes the AdSense line only when enabled and a pub id exists", () => {
    const body = adsTxtBody("ca-pub-1234567890123456", true);
    assert.equal(body, "google.com, pub-1234567890123456, DIRECT, f08c47fec0942fa0\n");
  });

  it("does not invent a google.com line when the client id is not a pub id", () => {
    const body = adsTxtBody("not-a-publisher", true);
    assert.match(body, /^#/);
    assert.doesNotMatch(body, /^google\.com,/);
  });
});
