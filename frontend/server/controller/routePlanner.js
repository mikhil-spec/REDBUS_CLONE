const SavedRoute =
  require("../models/savedRoute");

const Customer =
  require("../models/customer");

const {
  geocodeLocation,
  resolveCityCoordinate,
  calculateMultiWaypointRoutes
} =
  require("../services/trafficRoutingService");

function coordinatesAreValid(point) {
  return (
    point &&
    Number.isFinite(
      Number(point.lat)
    ) &&
    Number.isFinite(
      Number(point.lng)
    ) &&
    Number(point.lat) >= -90 &&
    Number(point.lat) <= 90 &&
    Number(point.lng) >= -180 &&
    Number(point.lng) <= 180
  );
}

// Plan route
exports.planRoute =
  async (req, res) => {
    try {
      const {
        origin,
        destination,
        waypoints
      } = req.body;

      if (
        !origin ||
        !destination
      ) {
        return res.status(400).json({
          success: false,
          message:
            "Origin and destination are required."
        });
      }

      const originGeo =
        typeof origin === "string"
          ? await geocodeLocation(
              origin
            )
          : {
              name:
                origin.name ||
                "Origin Point",

              lat:
                Number(
                  origin.lat
                ),

              lng:
                Number(
                  origin.lng
                )
            };

      const destinationGeo =
        typeof destination ===
        "string"
          ? await geocodeLocation(
              destination
            )
          : {
              name:
                destination.name ||
                "Destination Point",

              lat:
                Number(
                  destination.lat
                ),

              lng:
                Number(
                  destination.lng
                )
            };

      if (
        !coordinatesAreValid(
          originGeo
        ) ||
        !coordinatesAreValid(
          destinationGeo
        )
      ) {
        return res.status(400).json({
          success: false,
          message:
            "Origin and destination must contain valid coordinates."
        });
      }

      const resolvedWaypoints =
        [];

      if (
        Array.isArray(
          waypoints
        )
      ) {
        for (
          const waypoint of waypoints
        ) {
          const point =
            typeof waypoint ===
            "string"
              ? await geocodeLocation(
                  waypoint
                )
              : {
                  name:
                    waypoint.name ||
                    "Waypoint",

                  lat:
                    Number(
                      waypoint.lat
                    ),

                  lng:
                    Number(
                      waypoint.lng
                    ),

                  stopDurationMinutes:
                    Number(
                      waypoint.stopDurationMinutes
                    ) || 15
                };

          if (
            !coordinatesAreValid(
              point
            )
          ) {
            return res.status(400).json({
              success: false,
              message:
                "Every waypoint must contain valid coordinates."
            });
          }

          resolvedWaypoints.push(
            point
          );
        }
      }

      const suggestedRoutes =
        await calculateMultiWaypointRoutes(
          originGeo,
          destinationGeo,
          resolvedWaypoints
        );

      const dataSource =
        suggestedRoutes[0]?.dataSource || "estimated";

      return res.status(200).json({
        success: true,
        timestamp:
          new Date().toISOString(),

        // "mapbox" = live provider data; "estimated" = approximate, not live traffic.
        dataSource,
        dataSourceReason:
          suggestedRoutes[0]?.dataSourceReason || null,

        origin:
          originGeo,

        destination:
          destinationGeo,

        waypoints:
          resolvedWaypoints,

        routes:
          suggestedRoutes
      });
    } catch (error) {
      return res.status(500).json({
        success: false,
        message:
          "Failed to compute interactive route plan.",
        error: error.message
      });
    }
  };

// Traffic polling
exports.getLiveTrafficFeed =
  async (req, res) => {
    try {
      const {
        originCity,
        destinationCity,
        routeType
      } = req.query;

      const originGeo =
        await geocodeLocation(
          originCity ||
            "delhi"
        );

      const destinationGeo =
        await geocodeLocation(
          destinationCity ||
            "jaipur"
        );

      const updatedRoutes =
        await calculateMultiWaypointRoutes(
          originGeo,
          destinationGeo,
          []
        );

      if (!updatedRoutes.length) {
        return res.status(502).json({
          success: false,
          message: "No traffic data is available for this route.",
        });
      }

      const targetedRoute =
        updatedRoutes.find(
          route =>
            route.routeType ===
            (routeType ||
              "fastest")
        ) ||
        updatedRoutes[0];

      return res.status(200).json({
        success: true,

        updatedAt:
          new Date().toISOString(),

        dataSource:
          targetedRoute.dataSource || "estimated",

        routeId:
          targetedRoute.id,

        congestionLevel:
          targetedRoute.congestionLevel,

        congestionIndex:
          targetedRoute.congestionIndex,

        trafficDelayMinutes:
          targetedRoute.trafficDelayMinutes,

        totalDurationMinutes:
          targetedRoute.totalDurationMinutes,

        hotspots:
          targetedRoute.trafficHotspots
      });
    } catch (error) {
      return res.status(500).json({
        success: false,
        message:
          "Failed to retrieve live traffic feed.",
        error: error.message
      });
    }
  };

// Save route
exports.saveCustomRoute =
  async (req, res) => {
    try {
      const {
        customerId,
        routeName,
        origin,
        destination,
        waypoints,
        preferredRouteType,
        distanceKm,
        estimatedDurationMinutes,
        tags
      } = req.body;

      if (
        !customerId ||
        !routeName ||
        !origin ||
        !destination
      ) {
        return res.status(400).json({
          success: false,
          message:
            "Customer ID, route name, origin, and destination are required."
        });
      }

      const customer =
        await Customer.findById(
          customerId
        ).select("_id");

      if (!customer) {
        return res.status(404).json({
          success: false,
          message:
            "Customer not found."
        });
      }

      const savedRoute =
        await SavedRoute.create({
          customer:
            customer._id,

          routeName:
            String(routeName).trim().slice(0, 80),

          origin,

          destination,

          waypoints:
            waypoints || [],

          preferredRouteType:
            preferredRouteType ||
            "fastest",

          distanceKm:
            Number(distanceKm) ||
            0,

          estimatedDurationMinutes:
            Number(
              estimatedDurationMinutes
            ) || 0,

          tags:
            Array.isArray(tags)
              ? tags
              : [
                  "Frequent Highway"
                ]
        });

      return res.status(201).json({
        success: true,
        message:
          "Route saved to your profile for rapid access.",
        data:
          savedRoute
      });
    } catch (error) {
      return res.status(500).json({
        success: false,
        message:
          "Unable to save custom route.",
        error: error.message
      });
    }
  };

// Retrieve saved routes
exports.getUserSavedRoutes =
  async (req, res) => {
    try {
      const {
        customerId
      } = req.params;

      const customer =
        await Customer.findById(
          customerId
        ).select("_id");

      if (!customer) {
        return res.status(404).json({
          success: false,
          message:
            "Customer not found."
        });
      }

      const routes =
        await SavedRoute.find({
          customer:
            customer._id
        }).sort({
          createdAt: -1
        });

      return res.status(200).json({
        success: true,
        count:
          routes.length,
        data:
          routes
      });
    } catch (error) {
      return res.status(500).json({
        success: false,
        message:
          "Failed to load saved routes.",
        error: error.message
      });
    }
  };

// Delete saved route
exports.deleteSavedRoute =
  async (req, res) => {
    try {
      const {
        routeId
      } = req.params;

      const customerId =
        req.body?.customerId ||
        req.query.customerId;

      if (!customerId) {
        return res.status(400).json({
          success: false,
          message:
            "customerId is required."
        });
      }

      const deleted =
        await SavedRoute.findOneAndDelete(
          {
            _id: routeId,
            customer:
              customerId
          }
        );

      if (!deleted) {
        return res.status(404).json({
          success: false,
          message:
            "Saved route entry not found."
        });
      }

      return res.status(200).json({
        success: true,
        message:
          "Saved route removed successfully."
      });
    } catch (error) {
      return res.status(500).json({
        success: false,
        message:
          "Error removing saved route.",
        error: error.message
      });
    }
  };