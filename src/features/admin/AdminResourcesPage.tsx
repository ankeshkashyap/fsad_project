import React, { FormEvent, useState } from "react";
import { useResources } from "../../hooks/useResources";
import { Card } from "../../components/ui/Card";
import { Input } from "../../components/ui/Input";
import { Select } from "../../components/ui/Select";
import { Button } from "../../components/ui/Button";
import { ResourceCategory } from "../../types/resource";
import { useToast } from "../../components/ui/ToastProvider";

export const AdminResourcesPage: React.FC = () => {
  const { resources } = useResources();
  const { showToast } = useToast();

  const [title, setTitle] = useState("");
  const [url, setUrl] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState<ResourceCategory>("Article");
  const [source, setSource] = useState("");

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
    setTitle("");
    setUrl("");
    setDescription("");
    setSource("");
    showToast(
      "Resource saved in the mock admin panel. Connect an API later to persist this data.",
      "success"
    );
  };

  return (
    <section className="space-y-6">
      <header className="space-y-1">
        <h1 className="text-xl font-semibold text-slate-900 dark:text-slate-50">
          Manage resources
        </h1>
        <p className="text-sm text-foreground-muted">
          Review the curated resources students can access and draft new links to add later.
        </p>
      </header>

      <div className="grid gap-4 md:grid-cols-[3fr,2fr]">
        <Card className="space-y-3">
          <h2 className="text-sm font-semibold text-slate-900 dark:text-slate-50">
            Published resources
          </h2>
          {resources.length === 0 ? (
            <p className="text-sm text-foreground-muted">
              No resources are configured yet. Draft new items in the editor to prepare for future
              publication.
            </p>
          ) : (
            <ul className="space-y-2 text-sm text-foreground-muted">
              {resources.map((resource) => (
                <li
                  key={resource.id}
                  className="rounded-xl bg-slate-50 p-3 dark:bg-slate-900/60"
                >
                  <p className="font-medium text-slate-900 dark:text-slate-50">
                    {resource.title}
                  </p>
                  <p className="text-xs">{resource.description}</p>
                  <p className="mt-1 text-xs">
                    <span className="font-medium">Source:</span> {resource.source}
                  </p>
                </li>
              ))}
            </ul>
          )}
        </Card>
        <Card className="space-y-3">
          <h2 className="text-sm font-semibold text-slate-900 dark:text-slate-50">
            Draft a new resource
          </h2>
          <form onSubmit={handleSubmit} className="space-y-3">
            <Input
              label="Title"
              required
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
            <Input
              label="URL"
              type="url"
              required
              value={url}
              onChange={(e) => setUrl(e.target.value)}
            />
            <Input
              label="Source / organization"
              required
              value={source}
              onChange={(e) => setSource(e.target.value)}
            />
            <Select
              label="Category"
              value={category}
              onChange={(e) => setCategory(e.target.value as ResourceCategory)}
            >
              <option value="Article">Article</option>
              <option value="PDF">PDF</option>
              <option value="Website">Website</option>
            </Select>
            <label className="space-y-1 text-sm text-foreground-muted">
              <span className="block text-sm font-medium text-slate-900 dark:text-slate-50">
                Description
              </span>
              <textarea
                rows={3}
                required
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="block w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900 shadow-sm outline-none ring-primary-500 placeholder:text-slate-400 focus:border-primary-500 focus:ring-2 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100"
              />
            </label>
            <Button type="submit">Save draft</Button>
            <p className="text-xs text-foreground-muted">
              This form is wired to local component state only. When a backend is introduced, submit
              handlers can be replaced with API calls.
            </p>
          </form>
        </Card>
      </div>
    </section>
  );
};

