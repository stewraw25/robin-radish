"use client";

import Link from "next/link";
import { useRef, useState } from "react";
import { ShopLink } from "@/components/shop-link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  BIRD_GROUP_LINKS,
  BIRD_OPTIONS,
  BUDGET_OPTIONS,
  FEEDER_OPTIONS,
  recommend,
  SQUIRREL_OPTIONS,
  type BirdGroup,
  type Budget,
  type Feeder,
  type QuizResult,
  type Squirrels,
} from "@/lib/quiz";

export type ShopLinkItem = { name: string; href: string };

export function BirdQuiz({ shops }: { shops: ShopLinkItem[] }) {
  const [birds, setBirds] = useState<BirdGroup[]>([]);
  const [feeder, setFeeder] = useState<Feeder | null>(null);
  const [budget, setBudget] = useState<Budget | null>(null);
  const [squirrels, setSquirrels] = useState<Squirrels | null>(null);
  const [result, setResult] = useState<QuizResult | null>(null);
  const [error, setError] = useState<string | null>(null);
  const resultRef = useRef<HTMLHeadingElement>(null);

  function toggleBird(id: BirdGroup) {
    setBirds((current) => (current.includes(id) ? current.filter((item) => item !== id) : [...current, id]));
  }

  function onSubmit(event: React.FormEvent) {
    event.preventDefault();
    const next = recommend({ birds, feeder, budget, squirrels });
    if ("error" in next) {
      setResult(null);
      setError(next.error);
      return;
    }
    setError(null);
    setResult(next);
    requestAnimationFrame(() => resultRef.current?.focus());
  }

  return (
    <form onSubmit={onSubmit} className="space-y-8">
      <fieldset className="space-y-3">
        <legend className="font-heading text-xl">Which birds do you see?</legend>
        <p className="text-sm text-muted-foreground">Choose every group that visits. If you are unsure, tick the last option.</p>
        <div className="grid gap-2">
          {BIRD_OPTIONS.map((option) => (
            <label
              key={option.id}
              className="flex cursor-pointer items-start gap-3 rounded-lg border border-border bg-card px-3 py-3 has-[:checked]:border-primary has-[:checked]:bg-secondary"
            >
              <input
                type="checkbox"
                name="birds"
                value={option.id}
                checked={birds.includes(option.id)}
                onChange={() => toggleBird(option.id)}
                className="mt-1 size-4 accent-primary"
              />
              <span>{option.label}</span>
            </label>
          ))}
        </div>
      </fieldset>

      <fieldset className="space-y-3">
        <legend className="font-heading text-xl">What feeder do you use?</legend>
        <div className="grid gap-2">
          {FEEDER_OPTIONS.map((option) => (
            <label
              key={option.id}
              className="flex cursor-pointer items-start gap-3 rounded-lg border border-border bg-card px-3 py-3 has-[:checked]:border-primary has-[:checked]:bg-secondary"
            >
              <input
                type="radio"
                name="feeder"
                value={option.id}
                checked={feeder === option.id}
                onChange={() => setFeeder(option.id)}
                className="mt-1 size-4 accent-primary"
              />
              <span>
                <span className="block font-medium">{option.label}</span>
                <span className="block text-sm text-muted-foreground">{option.hint}</span>
              </span>
            </label>
          ))}
        </div>
      </fieldset>

      <fieldset className="space-y-3">
        <legend className="font-heading text-xl">How many foods do you want to keep?</legend>
        <div className="grid gap-2 sm:grid-cols-3">
          {BUDGET_OPTIONS.map((option) => (
            <label
              key={option.id}
              className="flex cursor-pointer items-start gap-3 rounded-lg border border-border bg-card px-3 py-3 has-[:checked]:border-primary has-[:checked]:bg-secondary"
            >
              <input
                type="radio"
                name="budget"
                value={option.id}
                checked={budget === option.id}
                onChange={() => setBudget(option.id)}
                className="mt-1 size-4 accent-primary"
              />
              <span>
                <span className="block font-medium">{option.label}</span>
                <span className="block text-sm text-muted-foreground">{option.hint}</span>
              </span>
            </label>
          ))}
        </div>
      </fieldset>

      <fieldset className="space-y-3">
        <legend className="font-heading text-xl">Do squirrels take the food?</legend>
        <div className="grid gap-2">
          {SQUIRREL_OPTIONS.map((option) => (
            <label
              key={option.id}
              className="flex cursor-pointer items-start gap-3 rounded-lg border border-border bg-card px-3 py-3 has-[:checked]:border-primary has-[:checked]:bg-secondary"
            >
              <input
                type="radio"
                name="squirrels"
                value={option.id}
                checked={squirrels === option.id}
                onChange={() => setSquirrels(option.id)}
                className="mt-1 size-4 accent-primary"
              />
              <span>{option.label}</span>
            </label>
          ))}
        </div>
      </fieldset>

      <div className="flex flex-wrap gap-3">
        <Button type="submit" size="lg" className="h-11 px-5 text-base">
          Show foods
        </Button>
        <Button
          type="button"
          variant="outline"
          size="lg"
          className="h-11 px-5 text-base"
          onClick={() => {
            setBirds([]);
            setFeeder(null);
            setBudget(null);
            setSquirrels(null);
            setResult(null);
            setError(null);
          }}
        >
          Start again
        </Button>
      </div>

      {error ? (
        <p role="alert" className="rounded-lg border border-destructive/40 bg-card px-3 py-2 text-sm text-destructive">
          {error}
        </p>
      ) : null}

      {result ? (
        <section aria-labelledby="quiz-result" className="space-y-4">
          <h2 id="quiz-result" ref={resultRef} tabIndex={-1} className="font-heading text-2xl outline-none">
            Foods for your garden
          </h2>
          <p className="text-muted-foreground">
            Suggested: {result.foods.map((food) => food.name.toLowerCase()).join(", ")}. This is a shortlist, not a ranking.
          </p>
          <div className="grid gap-4">
            {result.foods.map((food) => (
              <Card key={food.id}>
                <CardHeader>
                  <CardTitle className="font-heading text-xl">{food.name}</CardTitle>
                </CardHeader>
                <CardContent className="space-y-2 text-sm leading-relaxed">
                  <p>{food.explanation}</p>
                  <p className="text-muted-foreground">{food.because}</p>
                </CardContent>
              </Card>
            ))}
          </div>
          {result.feederNote ? <p className="text-sm leading-relaxed">{result.feederNote}</p> : null}
          {result.squirrelNote ? <p className="text-sm leading-relaxed">{result.squirrelNote}</p> : null}
          <p className="text-sm leading-relaxed">
            Read the species notes:{" "}
            {birds
              .flatMap((group) => BIRD_GROUP_LINKS[group])
              .filter((link, index, list) => list.findIndex((item) => item.href === link.href) === index)
              .map((link, index) => (
                <span key={link.href}>
                  {index > 0 ? ", " : null}
                  <Link href={link.href} className="font-medium underline decoration-soil/60 underline-offset-2">
                    {link.label}
                  </Link>
                </span>
              ))}
            .
          </p>
          <div className="space-y-3">
            <h3 className="font-heading text-lg">Shops that sell these foods</h3>
            <p className="text-sm text-muted-foreground">The quiz is not a ranking of shops or of any particular bag.</p>
            <ul className="flex flex-col gap-2">
              {shops.map((shop) => (
                <li key={shop.href}>
                  <ShopLink href={shop.href}>{shop.name}</ShopLink>
                </li>
              ))}
            </ul>
          </div>
        </section>
      ) : null}
    </form>
  );
}
