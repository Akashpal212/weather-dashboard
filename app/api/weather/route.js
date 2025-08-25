import { NextResponse } from "next/server";

export const GET = async (req) => {
  try {
    const { searchParams } = new URL(req.url);
    const city = searchParams.get("city");
    if (!city) {
      return NextResponse.json({ message: "City is required" }, { status: 400 });
    }

    const apiKey = process.env.OPENWEATHER_API_KEY;
    const base = process.env.OPENWEATHER_BASE_URL || "https://api.openweathermap.org/data/2.5";

    const url = `${base}/weather?q=${encodeURIComponent(city)}&units=metric&appid=${apiKey}`;

    const res = await fetch(url, { cache: "no-store" });
    if (!res.ok) {
      const err = await res.json().catch(() => ({}));
      return NextResponse.json(
        { message: err?.message || "Failed to fetch weather data" },
        { status: res.status }
      );
    }

    const data = await res.json();
    const result = {
      city: data.name,
      country: data.sys?.country,
      temperature: data.main?.temp,
      condition: data.weather?.[0]?.main,
      description: data.weather?.[0]?.description,
      humidity: data.main?.humidity,
      windSpeed: data.wind?.speed,
      icon: data.weather?.[0]?.icon,
    };

    return NextResponse.json(result, { status: 200 });
  } catch (e) {
    return NextResponse.json({ message: "Something went wrong" }, { status: 500 });
  }
}
