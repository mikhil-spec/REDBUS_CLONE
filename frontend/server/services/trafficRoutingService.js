const CITY_COORDINATES = {
  delhi: {
    name: "Delhi ISBT",
    lat: 28.6692,
    lng: 77.2285
  },

  gurgaon: {
    name: "Gurgaon IFFCO Chowk",
    lat: 28.4722,
    lng: 77.0725
  },

  neemrana: {
    name: "Neemrana Midpoint",
    lat: 27.9942,
    lng: 76.3888
  },

  jaipur: {
    name: "Jaipur Sindhi Camp",
    lat: 26.9239,
    lng: 75.8005
  },

  agra: {
    name: "Agra Express Plaza",
    lat: 27.1767,
    lng: 78.0081
  },

  mathura: {
    name: "Mathura Bypass",
    lat: 27.4924,
    lng: 77.6737
  },

  bangalore: {
    name: "Bangalore Majestic",
    lat: 12.9774,
    lng: 77.5708
  },

  hyderabad: {
    name: "Hyderabad MGBS",
    lat: 17.3786,
    lng: 78.4819
  },

  kurnool: {
    name: "Kurnool Tollway",
    lat: 15.8281,
    lng: 78.0373
  },

  anantapur: {
    name: "Anantapur Highway Junction",
    lat: 14.6819,
    lng: 77.6006
  },

  mumbai: {
    name: "Mumbai Dadar TT",
    lat: 19.0178,
    lng: 72.8478
  },

  pune: {
    name: "Pune Swargate",
    lat: 18.5018,
    lng: 73.8636
  },

  lonavala: {
    name: "Lonavala Ghat Pass",
    lat: 18.7557,
    lng: 73.4091
  }
};

const MAPBOX_TOKEN =
  process.env.MAPBOX_ACCESS_TOKEN || "";

function calculateHaversineDistance(
  lat1,
  lon1,
  lat2,
  lon2
) {
  const earthRadiusKm = 6371;

  const dLat =
    ((lat2 - lat1) *
      Math.PI) /
    180;

  const dLon =
    ((lon2 - lon1) *
      Math.PI) /
    180;

  const a =
    Math.sin(dLat / 2) *
      Math.sin(dLat / 2) +
    Math.cos(
      (lat1 * Math.PI) / 180
    ) *
      Math.cos(
        (lat2 * Math.PI) / 180
      ) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);

  const c =
    2 *
    Math.atan2(
      Math.sqrt(a),
      Math.sqrt(1 - a)
    );

  return earthRadiusKm * c;
}

function interpolatePolyline(
  points,
  curveOffset = 0
) {
  const polyline = [];

  for (
    let i = 0;
    i < points.length - 1;
    i++
  ) {
    const start = points[i];
    const end = points[i + 1];

    const steps = 14;

    for (
      let step = 0;
      step <= steps;
      step++
    ) {
      const fraction =
        step / steps;

      const baseLat =
        start.lat +
        (end.lat - start.lat) *
          fraction;

      const baseLng =
        start.lng +
        (end.lng - start.lng) *
          fraction;

      const curvature =
        Math.sin(
          fraction * Math.PI
        ) *
        curveOffset;

      polyline.push([
        Number(
          (
            baseLat +
            curvature * 0.12
          ).toFixed(5)
        ),

        Number(
          (
            baseLng +
            curvature * 0.15
          ).toFixed(5)
        )
      ]);
    }
  }

  return polyline;
}

function resolveCityCoordinate(
  cityName
) {
  const normalized =
    String(cityName || "")
      .trim()
      .toLowerCase();

  const known =
    CITY_COORDINATES[normalized] ||
    Object.values(CITY_COORDINATES).find(
      point => String(point.name).trim().toLowerCase() === normalized
    );

  if (known) {
    return {
      ...known
    };
  }

  throw new Error(
    `Location "${cityName}" is not available in the local city database. ` +
    `Configure MAPBOX_ACCESS_TOKEN for arbitrary address geocoding.`
  );
}

async function geocodeLocation(
  location
) {
  if (
    typeof location !==
    "string"
  ) {
    return location;
  }

  if (!MAPBOX_TOKEN) {
    return resolveCityCoordinate(
      location
    );
  }

  const url =
    "https://api.mapbox.com/search/geocode/v6/forward" +
    `?q=${encodeURIComponent(
      location
    )}` +
    "&country=IN" +
    "&limit=1" +
    `&access_token=${encodeURIComponent(
      MAPBOX_TOKEN
    )}`;

  const response =
    await fetch(url);

  if (!response.ok) {
    throw new Error(
      `Mapbox geocoding failed (${response.status}).`
    );
  }

  const data =
    await response.json();

  const feature =
    data.features?.[0];

  const coordinates =
    feature?.geometry
      ?.coordinates;

  if (!coordinates) {
    throw new Error(
      `Could not locate "${location}".`
    );
  }

  return {
    name:
      feature.properties
        ?.full_address ||
      feature.properties?.name ||
      location,

    lng: Number(
      coordinates[0]
    ),

    lat: Number(
      coordinates[1]
    )
  };
}

function computeLiveTraffic(
  routeType,
  distanceKm
) {
  // Peak hours are defined in India Standard Time, not the server's timezone.
  const currentHour =
    new Date(Date.now() + 330 * 60 * 1000).getUTCHours();

  const isPeakHour =
    (currentHour >= 8 &&
      currentHour <= 11) ||
    (currentHour >= 17 &&
      currentHour <= 21);

  let congestionLevel =
    "LOW";

  let congestionMultiplier =
    1.05;

  let delayMinutes =
    Math.round(
      distanceKm * 0.04
    );

  let congestionIndex = 22;

  if (
    routeType === "fastest"
  ) {
    if (isPeakHour) {
      congestionLevel =
        "HEAVY";

      congestionMultiplier =
        1.45;

      delayMinutes =
        Math.round(
          distanceKm * 0.16
        ) + 18;

      congestionIndex = 78;
    } else {
      congestionLevel =
        "MODERATE";

      congestionMultiplier =
        1.18;

      delayMinutes =
        Math.round(
          distanceKm * 0.08
        ) + 8;

      congestionIndex = 48;
    }
  } else if (
    routeType ===
    "least_traffic"
  ) {
    congestionLevel =
      "LOW";

    congestionMultiplier =
      1.08;

    delayMinutes =
      Math.round(
        distanceKm * 0.03
      ) + 4;

    congestionIndex = 19;
  } else {
    congestionLevel =
      "MODERATE";

    congestionMultiplier =
      1.15;

    delayMinutes =
      Math.round(
        distanceKm * 0.06
      ) + 10;

    congestionIndex = 36;
  }

  return {
    congestionLevel,
    congestionMultiplier,
    delayMinutes,
    congestionIndex
  };
}

async function calculateMapboxRoutes(
  points
) {
  const coordinates =
    points
      .map(
        point =>
          `${point.lng},${point.lat}`
      )
      .join(";");

  const url =
    `https://api.mapbox.com/directions/v5/mapbox/driving-traffic/${coordinates}` +
    "?alternatives=true" +
    "&overview=full" +
    "&geometries=geojson" +
    "&annotations=congestion,duration" +
    `&access_token=${encodeURIComponent(
      MAPBOX_TOKEN
    )}`;

  const response =
    await fetch(url);

  if (!response.ok) {
    throw new Error(
      `Mapbox traffic routing failed (${response.status}).`
    );
  }

  const data =
    await response.json();

  if (
    !data.routes ||
    !data.routes.length
  ) {
    throw new Error(
      "Mapbox returned no routes."
    );
  }

  return data.routes
    .slice(0, 3)
    .map(
      (route, index) => {
        const congestion =
          route.legs?.flatMap(
            leg =>
              leg.annotation
                ?.congestion ||
              []
          ) || [];

        const severe =
          congestion.some(
            value =>
              value ===
                "severe" ||
              value ===
                "heavy"
          );

        const moderate =
          congestion.some(
            value =>
              value ===
                "moderate"
          );

        const congestionLevel =
          severe
            ? "HEAVY"
            : moderate
            ? "MODERATE"
            : "LOW";

        const congestionIndex =
          severe
            ? 80
            : moderate
            ? 50
            : 20;

        return {
          id:
            `mapbox_route_${index + 1}`,

          name:
            index === 0
              ? "Fastest Traffic-Aware Route"
              : `Alternative Route ${index + 1}`,

          routeType:
            index === 0
              ? "fastest"
              : index === 1
              ? "least_traffic"
              : "scenic",

          isRecommended:
            index === 0,

          distanceKm:
            Number(
              (
                route.distance /
                1000
              ).toFixed(1)
            ),

          baseDurationMinutes:
            Math.round(
              route.duration /
                60
            ),

          trafficDelayMinutes:
            Number.isFinite(route.duration_typical)
              ? Math.max(
                  0,
                  Math.round(
                    (route.duration - route.duration_typical) / 60
                  )
                )
              : 0,

          totalDurationMinutes:
            Math.round(
              route.duration /
                60
            ),

          congestionLevel,

          congestionIndex,

          tollCount: 0,

          tollCost: 0,

          coordinates:
            (
              route.geometry
                ?.coordinates ||
              []
            ).map(
              ([lng, lat]) =>
                [lat, lng]
            ),

          trafficHotspots: [],

          dataSource: "mapbox"
        };
      }
    );
}

function calculateFallbackRoutes(
  originGeo,
  destGeo,
  waypoints = []
) {
  const orderedNodes = [
    originGeo,
    ...waypoints,
    destGeo
  ];

  let cumulativeDistance = 0;

  for (
    let i = 0;
    i <
      orderedNodes.length - 1;
    i++
  ) {
    cumulativeDistance +=
      calculateHaversineDistance(
        orderedNodes[i].lat,
        orderedNodes[i].lng,
        orderedNodes[i + 1].lat,
        orderedNodes[i + 1].lng
      );
  }

  const baseRoadDistance =
    Math.round(
      cumulativeDistance * 1.24
    );

  const trafficOne =
    computeLiveTraffic(
      "fastest",
      baseRoadDistance
    );

  const baseMinutesOne =
    Math.round(
      (baseRoadDistance / 75) *
        60
    );

  const routeOne = {
    id:
      "route_express_primary",

    name:
      "National Highway Express Route",

    routeType:
      "fastest",

    isRecommended: true,

    distanceKm:
      baseRoadDistance,

    baseDurationMinutes:
      baseMinutesOne,

    trafficDelayMinutes:
      trafficOne.delayMinutes,

    totalDurationMinutes:
      Math.round(
        baseMinutesOne *
          trafficOne.congestionMultiplier
      ) +
      trafficOne.delayMinutes,

    congestionLevel:
      trafficOne.congestionLevel,

    congestionIndex:
      trafficOne.congestionIndex,

    tollCount:
      Math.max(
        1,
        Math.round(
          baseRoadDistance / 65
        )
      ),

    tollCost:
      Math.round(
        baseRoadDistance * 1.45
      ),

    coordinates:
      interpolatePolyline(
        orderedNodes,
        0
      ),

    trafficHotspots: [
      {
        name:
          "Toll Plaza Choke Point",

        delayMin:
          Math.round(
            trafficOne.delayMinutes *
              0.6
          ),

        severity:
          trafficOne.congestionLevel
      }
    ]
  };

  const distanceTwo =
    Math.round(
      baseRoadDistance * 1.1
    );

  const trafficTwo =
    computeLiveTraffic(
      "least_traffic",
      distanceTwo
    );

  const baseMinutesTwo =
    Math.round(
      (distanceTwo / 68) *
        60
    );

  const routeTwo = {
    id:
      "route_low_traffic_bypass",

    name:
      "State Expressway & Bypass (Least Congestion)",

    routeType:
      "least_traffic",

    isRecommended: false,

    distanceKm:
      distanceTwo,

    baseDurationMinutes:
      baseMinutesTwo,

    trafficDelayMinutes:
      trafficTwo.delayMinutes,

    totalDurationMinutes:
      Math.round(
        baseMinutesTwo *
          trafficTwo.congestionMultiplier
      ) +
      trafficTwo.delayMinutes,

    congestionLevel:
      trafficTwo.congestionLevel,

    congestionIndex:
      trafficTwo.congestionIndex,

    tollCount:
      Math.max(
        1,
        Math.round(
          distanceTwo / 90
        )
      ),

    tollCost:
      Math.round(
        distanceTwo * 0.95
      ),

    coordinates:
      interpolatePolyline(
        orderedNodes,
        0.22
      ),

    trafficHotspots: []
  };

  const distanceThree =
    Math.round(
      baseRoadDistance * 1.18
    );

  const trafficThree =
    computeLiveTraffic(
      "scenic",
      distanceThree
    );

  const baseMinutesThree =
    Math.round(
      distanceThree
    );

  const routeThree = {
    id:
      "route_scenic_alternative",

    name:
      "Scenic Countryside Corridor",

    routeType:
      "scenic",

    isRecommended: false,

    distanceKm:
      distanceThree,

    baseDurationMinutes:
      baseMinutesThree,

    trafficDelayMinutes:
      trafficThree.delayMinutes,

    totalDurationMinutes:
      Math.round(
        baseMinutesThree *
          trafficThree.congestionMultiplier
      ) +
      trafficThree.delayMinutes,

    congestionLevel:
      trafficThree.congestionLevel,

    congestionIndex:
      trafficThree.congestionIndex,

    tollCount: 0,

    tollCost: 0,

    coordinates:
      interpolatePolyline(
        orderedNodes,
        -0.26
      ),

    trafficHotspots: []
  };

  return [
    routeOne,
    routeTwo,
    routeThree
  ];
}

async function calculateMultiWaypointRoutes(
  originGeo,
  destGeo,
  waypoints = []
) {
  let fallbackReason = "MAPBOX_ACCESS_TOKEN is not configured on the server.";

  if (MAPBOX_TOKEN) {
    try {
      const stopRoutes = await calculateMapboxRoutes(
        [
          originGeo,
          ...waypoints,
          destGeo
        ]
      );
      if (!waypoints.length) return stopRoutes;

      // Mapbox returns no alternatives for multi-stop trips. Direct routes that skip
      // the stops are added as clearly labelled alternatives, never as the recommendation.
      const directRoutes = await calculateMapboxRoutes([originGeo, destGeo])
        .catch(() => []);
      const stopCount = waypoints.length;
      const extras = directRoutes
        .slice(0, Math.max(0, 3 - stopRoutes.length))
        .map((route, index) => ({
          ...route,
          id: `mapbox_direct_${index + 1}`,
          name: `Direct route (skips ${stopCount} stop${stopCount === 1 ? "" : "s"})`,
          isRecommended: false,
          skipsStops: true
        }));
      return [...stopRoutes, ...extras];
    } catch (error) {
      fallbackReason = `Live routing provider failed: ${error.message}`;
      console.error(
        "[Mapbox] Route calculation failed:",
        error.message
      );
    }
  }

  // Estimated routes are NOT live road data or live traffic. They are labelled
  // so the interface never presents them as real-time traffic.
  return calculateFallbackRoutes(
    originGeo,
    destGeo,
    waypoints
  ).map(route => ({
    ...route,
    dataSource: "estimated",
    dataSourceReason: fallbackReason
  }));
}

module.exports = {
  resolveCityCoordinate,
  geocodeLocation,
  calculateMultiWaypointRoutes
};