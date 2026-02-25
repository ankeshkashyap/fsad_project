import React from "react";
import { useResources } from "../../hooks/useResources";
import { Card } from "../../components/ui/Card";
import { Input } from "../../components/ui/Input";
import { Select } from "../../components/ui/Select";
import resourcesIllustration from "../../assets/resources-eco.svg";

export const ResourcesPage: React.FC = () => {
  const { filteredResources, filters, setFilters } = useResources();

  return (
    <section className="space-y-6">
      <header className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="space-y-1">
          <h1 className="text-xl font-semibold text-slate-900 dark:text-slate-50">
            Learning resources
          </h1>
          <p className="text-sm text-foreground-muted">
            Explore curated articles, guides, and websites that deepen your understanding of
            sustainable living.
          </p>
        </div>
        <div className="hidden max-w-[220px] flex-shrink-0 sm:block">
          <img
            src={resourcesIllustration}
            alt="Illustration of sustainability resources such as articles and guides."
            loading="lazy"
            className="w-full drop-shadow-sm"
          />
        </div>
      </header>

      <div className="grid gap-4 md:grid-cols-[2fr,3fr]">
        <Card className="space-y-3 text-sm text-foreground-muted">
          <h2 className="text-sm font-semibold text-slate-900 dark:text-slate-50">
            Find the right resource
          </h2>
          <p>
            Use the search and filters to find resources that match your current projects or
            interests. Resources link out to trusted organizations and reference materials.
          </p>
        </Card>
        <div className="space-y-4">
          <div className="flex flex-col gap-3 sm:flex-row">
            <div className="flex-1">
              <Input
                label="Search resources"
                placeholder="Search by title, description, or source"
                value={filters.search}
                onChange={(e) => setFilters({ ...filters, search: e.target.value })}
              />
            </div>
            <div className="w-full sm:w-48">
              <Select
                label="Category"
                value={filters.category}
                onChange={(e) =>
                  setFilters({
                    ...filters,
                    category: e.target.value as typeof filters.category
                  })
                }
              >
                <option value="All">All types</option>
                <option value="Article">Articles</option>
                <option value="PDF">PDF guides</option>
                <option value="Website">Websites</option>
              </Select>
            </div>
          </div>

          {filteredResources.length === 0 ? (
            <Card className="text-sm text-foreground-muted">
              No resources match your filters. Try broadening your search or selecting &ldquo;All
              types&rdquo;.
            </Card>
          ) : (
            <div className="grid gap-3 md:grid-cols-2">
              {filteredResources.map((resource) => (
                <Card key={resource.id} className="space-y-2">
                  <div>
                    <h2 className="text-sm font-semibold text-slate-900 dark:text-slate-50">
                      {resource.title}
                    </h2>
                    <p className="text-xs text-foreground-muted">{resource.source}</p>
                  </div>
                  <p className="text-xs text-foreground-muted">{resource.description}</p>
                  <div className="flex items-center justify-between text-xs">
                    <span className="rounded-full bg-slate-100 px-2 py-0.5 text-foreground-muted dark:bg-slate-800">
                      {resource.category}
                    </span>
                    <a
                      href={resource.url}
                      target="_blank"
                      rel="noreferrer"
                      className="font-medium text-primary-700 hover:underline dark:text-primary-300"
                    >
                      Open resource
                    </a>
                  </div>
                </Card>
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

