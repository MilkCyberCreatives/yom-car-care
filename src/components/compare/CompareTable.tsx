"use client";

import { useCompare } from "@/components/compare/CompareProvider";

type Props = {
  /** Optional close handler for parent bars/drawers */
  onClose?: () => void;
};

export default function CompareTable({ onClose }: Props) {
  const { items = [], remove, clear } = useCompare();

  if (!items.length) return null;

  return (
    <div className="mt-3 rounded-xl border border-white/10 bg-zinc-950/80">
      <div className="flex items-center justify-between p-3">
        <div className="text-sm font-medium">Compare</div>
        <div className="flex items-center gap-2">
          <button
            type="button"
            className="btn-ghost"
            onClick={() => {
              clear?.();
              onClose?.();
            }}
          >
            Clear
          </button>
          <button type="button" className="btn-ghost" onClick={onClose}>
            Close
          </button>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead className="text-left text-white/70">
            <tr>
              <th className="px-3 py-2">Product</th>
              <th className="px-3 py-2">Category</th>
              <th className="px-3 py-2">Size</th>
              <th className="px-3 py-2">Price</th>
              <th className="px-3 py-2"></th>
            </tr>
          </thead>
          <tbody>
            {items.map((p: any) => (
              <tr key={p.slug} className="border-t border-white/10">
                <td className="px-3 py-2">{p.name}</td>
                <td className="px-3 py-2 capitalize">
                  {String(p.category || "").replace(/-/g, " ")}
                </td>
                <td className="px-3 py-2">{p.size ?? "—"}</td>
                <td className="px-3 py-2">
                  {p.price != null ? String(p.price) : "—"}
                </td>
                <td className="px-3 py-2 text-right">
                  <button
                    type="button"
                    className="text-white/70 hover:text-white underline"
                    onClick={() => remove?.(p.slug)}
                  >
                    remove
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
