# Building a Ray Tracer from Scratch

Ray tracing is a rendering technique that simulates the way light interacts with objects to produce photorealistic images. Let's build one step by step.

## How Ray Tracing Works

The basic idea is simple:

1. **Cast a ray** from the camera through each pixel on the screen
2. **Find intersections** with objects in the scene
3. **Calculate lighting** at the intersection point
4. **Combine colors** to determine the final pixel color

## The Ray

A ray is defined by an origin point and a direction:

```rust
struct Ray {
    origin: Vec3,
    direction: Vec3,
}

impl Ray {
    fn at(&self, t: f64) -> Vec3 {
        self.origin + t * self.direction
    }
}
```

## Sphere Intersection

The most common primitive is a sphere. To find where a ray hits a sphere, we solve:

$$(P - C) \cdot (P - C) = r^2$$

where P is a point on the ray and C is the sphere center.

This reduces to a quadratic equation that gives us 0, 1, or 2 intersection points.

## Adding Materials

Different materials interact with light differently:

| Material    | Behavior                          |
|-------------|-----------------------------------|
| Diffuse     | Scatters light in random directions |
| Metal       | Reflects light like a mirror       |
| Dielectric  | Refracts light (glass, water)      |

## Results

Even a simple ray tracer with spheres and basic materials can produce stunning images. The key insight is that physically-based rendering doesn't require complex heuristics — just accurate simulation of light transport.

### Next Steps

- Add triangle meshes for complex geometry
- Implement bounding volume hierarchies (BVH) for speed
- Add texture mapping and normal maps
- Explore path tracing for global illumination
