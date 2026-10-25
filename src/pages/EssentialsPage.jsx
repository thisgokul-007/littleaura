import React, { useState, useMemo } from 'react';
import {
  Package,
  Plus,
  AlertTriangle,
  CheckCircle2,
  Bell,
  RefreshCw,
  ShoppingBag,
  Sparkles,
  Trash2,
  Search,
  Filter,
  Calendar,
  Pill,
  Scissors,
  Info
} from 'lucide-react';
import { Card, CardHeader } from '../components/common/Card';
import { Button } from '../components/common/Button';
import { Badge } from '../components/common/Badge';
import { Input, Textarea } from '../components/common/Input';
import { Modal } from '../components/common/Modal';
import { useChild } from '../context/ChildContext';

export function EssentialsPage() {
  const { essentials, restockEssential, addEssentialItem, deleteEssentialItem } = useChild();

  const [selectedCategory, setSelectedCategory] = useState('All');
  const [filterView, setFilterView] = useState('all'); // 'all' | 'lowStock'
  const [searchQuery, setSearchQuery] = useState('');

  // Modals
  const [restockModalItem, setRestockModalItem] = useState(null);
  const [restockQty, setRestockQty] = useState(15);
  const [isNewItemModalOpen, setIsNewItemModalOpen] = useState(false);

  const [newItem, setNewItem] = useState({
    name: '',
    category: 'Diapers',
    quantity: 10,
    unit: 'pcs',
    minThreshold: 10,
    expiryDate: '',
    notes: ''
  });

  const categories = [
    'All',
    'Diapers',
    'Baby Lotion',
    'Bath Products',
    'Medicine',
    'Clothes',
    'Hygiene Tasks'
  ];

  // Recurring care tasks
  const recurringCareTasks = [
    { id: 'rc1', title: 'Sunday Baby Nail Trimming', frequency: 'Weekly (Every Sunday evening)', notes: 'Trim gently after bath when nails are soft', icon: Scissors, status: 'Scheduled Today 6:00 PM' },
    { id: 'rc2', title: 'Infant Teething Gums Clean', frequency: 'Daily after evening feed', notes: 'Use sterile damp soft cloth on gums', icon: Sparkles, status: 'Active Routine' },
    { id: 'rc3', title: 'Sanitize Teethers & Pacifiers', frequency: 'Twice Weekly', notes: 'Boil or steam sterilize for 5 minutes', icon: RefreshCw, status: 'Due in 2 days' }
  ];

  // Filtered items
  const filteredItems = useMemo(() => {
    return essentials.filter(item => {
      const matchCat = selectedCategory === 'All' || item.category === selectedCategory;
      const isLow = item.quantity <= item.minThreshold;
      const matchView = filterView === 'all' || (filterView === 'lowStock' && isLow);
      const matchSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          item.notes?.toLowerCase()?.includes(searchQuery.toLowerCase());
      return matchCat && matchView && matchSearch;
    });
  }, [essentials, selectedCategory, filterView, searchQuery]);

  const lowStockCount = essentials.filter(e => e.quantity <= e.minThreshold).length;

  const handleRestockSubmit = (e) => {
    e.preventDefault();
    if (!restockModalItem) return;
    restockEssential(restockModalItem.id, restockQty);
    setRestockModalItem(null);
    setRestockQty(15);
  };

  const handleAddNewItem = (e) => {
    e.preventDefault();
    if (!newItem.name) return;
    addEssentialItem({
      ...newItem,
      quantity: parseInt(newItem.quantity, 10),
      minThreshold: parseInt(newItem.minThreshold, 10)
    });
    setIsNewItemModalOpen(false);
    setNewItem({
      name: '',
      category: 'Diapers',
      quantity: 10,
      unit: 'pcs',
      minThreshold: 10,
      expiryDate: '',
      notes: ''
    });
  };

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl sm:text-2xl font-extrabold text-[#023859] tracking-tight">
            Baby Essentials & Inventory
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
            Monitor diaper inventory, bath consumables, safety thresholds, and recurring care tasks.
          </p>
        </div>

        <Button
          variant="primary"
          size="sm"
          icon={Plus}
          onClick={() => setIsNewItemModalOpen(true)}
        >
          Add Item
        </Button>
      </div>

      {/* Smart Replenishment Alert Banner */}
      {lowStockCount > 0 && (
        <div className="p-4 rounded-2xl bg-amber-50/90 border border-amber-200 flex flex-col sm:flex-row sm:items-center justify-between gap-3 shadow-xs">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-amber-100 text-amber-800 shrink-0">
              <AlertTriangle className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-xs sm:text-sm font-bold text-amber-950">
                Replenishment Recommended: {lowStockCount} essential item(s) below threshold
              </h4>
              <p className="text-xs text-amber-800">
                Supplies such as diapers or washes have dropped near your safety buffer.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 self-end sm:self-auto">
            <Button
              variant="outline"
              size="sm"
              className="border-amber-300 text-amber-900 bg-white"
              onClick={() => setFilterView(filterView === 'lowStock' ? 'all' : 'lowStock')}
            >
              {filterView === 'lowStock' ? 'Show All Items' : 'Filter Low Stock'}
            </Button>
          </div>
        </div>
      )}

      {/* Filter and Search Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-1 border-b border-slate-200">
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3.5 py-1.5 text-xs font-bold rounded-2xl transition-all whitespace-nowrap ${
                selectedCategory === cat
                  ? 'bg-[#26658c] text-white shadow-sm'
                  : 'bg-white border border-slate-200 text-slate-600 hover:bg-slate-50'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        <div className="relative max-w-xs w-full">
          <Search className="absolute left-3 top-2.5 w-4 h-4 text-slate-400" />
          <input
            type="text"
            placeholder="Search essentials..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-3 py-1.5 text-xs rounded-xl border border-slate-300 bg-white text-[#011c40] placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-[#26658c]/20"
          />
        </div>
      </div>

      {/* Special Medical Safety Reminder */}
      {selectedCategory === 'Medicine' && (
        <div className="p-4 rounded-2xl bg-purple-50/60 border border-purple-200 text-xs text-purple-950 flex items-start gap-3">
          <Info className="w-4 h-4 text-purple-700 shrink-0 mt-0.5" />
          <p className="leading-relaxed">
            <strong>Medication Inventory Safety Notice:</strong> Medicines and vitamin drops are tracked here solely for inventory counts. Never alter prescribed dosages or treat medication as standard consumables. Keep all medicines locked away from toddlers.
          </p>
        </div>
      )}

      {/* Essentials Items Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredItems.map((item) => {
          const isLow = item.quantity <= item.minThreshold;
          return (
            <Card
              key={item.id}
              className={`p-5 flex flex-col justify-between ${
                isLow ? 'border-amber-300 bg-amber-50/20' : 'bg-white'
              }`}
            >
              <div>
                <div className="flex items-start justify-between mb-3">
                  <div className={`p-2.5 rounded-xl ${
                    isLow ? 'bg-amber-100 text-amber-700' : 'bg-[#a7ebf2]/40 text-[#26658c]'
                  }`}>
                    {item.category === 'Medicine' ? <Pill className="w-5 h-5" /> : <Package className="w-5 h-5" />}
                  </div>
                  <Badge variant={isLow ? 'danger' : 'mint'} size="sm" dot>
                    {isLow ? 'LOW STOCK' : 'In Stock'}
                  </Badge>
                </div>

                <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                  {item.category}
                </span>
                <h4 className="text-sm font-bold text-[#023859] mt-0.5">
                  {item.name}
                </h4>

                <div className="my-3 flex items-baseline gap-2">
                  <span className={`text-2xl font-black ${isLow ? 'text-rose-700' : 'text-[#023859]'}`}>
                    {item.quantity}
                  </span>
                  <span className="text-xs text-slate-500 font-semibold">
                    {item.unit} remaining
                  </span>
                </div>

                <p className="text-[11px] text-slate-500">
                  {item.notes || 'Routine nursery essential.'}
                </p>

                {item.expiryDate && (
                  <p className="text-[10px] text-slate-400 mt-1 flex items-center gap-1">
                    <Calendar className="w-3 h-3 text-slate-400" />
                    <span>Expires: {item.expiryDate}</span>
                  </p>
                )}
              </div>

              <div className="mt-5 pt-3 border-t border-slate-100 flex items-center justify-between">
                <span className="text-[10px] text-slate-400">
                  Buffer: min {item.minThreshold} {item.unit}
                </span>

                <div className="flex items-center gap-1.5">
                  <Button
                    variant={isLow ? 'primary' : 'outline'}
                    size="xs"
                    icon={Plus}
                    onClick={() => setRestockModalItem(item)}
                  >
                    Restock
                  </Button>
                  <button
                    onClick={() => {
                      if (confirm(`Remove "${item.name}" from inventory?`)) {
                        deleteEssentialItem(item.id);
                      }
                    }}
                    className="p-1 rounded-lg text-slate-400 hover:text-rose-600 hover:bg-rose-50 transition-colors"
                    title="Delete Item"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </Card>
          );
        })}
      </div>

      {filteredItems.length === 0 && (
        <Card className="p-8 text-center text-slate-500 text-xs">
          No inventory items match your search. Click "+ Add Item" to register a product.
        </Card>
      )}

      {/* Recurring Care Tasks Section (Nail care, teething, etc.) */}
      <Card className="p-6 space-y-4">
        <div className="flex items-center justify-between pb-3 border-b border-slate-100">
          <div>
            <h3 className="text-base font-bold text-[#023859] flex items-center gap-2">
              <Scissors className="w-5 h-5 text-[#26658c]" />
              <span>Recurring Care Tasks & Reminders</span>
            </h3>
            <p className="text-xs text-slate-500 mt-0.5">
              Scheduled weekly tasks like infant nail trimming and hygiene routines
            </p>
          </div>
          <Badge variant="aqua" size="sm">
            Automated Alerts
          </Badge>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          {recurringCareTasks.map((task) => {
            const Icon = task.icon;
            return (
              <div key={task.id} className="p-4 rounded-2xl bg-slate-50 border border-slate-200 flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <div className="p-2 rounded-xl bg-white text-[#26658c] shadow-xs">
                      <Icon className="w-4 h-4" />
                    </div>
                    <Badge variant="teal" size="xs">
                      {task.frequency}
                    </Badge>
                  </div>
                  <h4 className="text-xs font-bold text-[#023859]">{task.title}</h4>
                  <p className="text-[11px] text-slate-500 mt-1">{task.notes}</p>
                </div>
                <div className="mt-4 pt-2 border-t border-slate-200/60 text-[10px] font-semibold text-[#26658c]">
                  ✓ {task.status}
                </div>
              </div>
            );
          })}
        </div>
      </Card>

      {/* Restock Modal */}
      <Modal
        isOpen={Boolean(restockModalItem)}
        onClose={() => setRestockModalItem(null)}
        title={`Restock ${restockModalItem?.name}`}
        subtitle="Log added inventory to update stock counts"
      >
        <form onSubmit={handleRestockSubmit} className="space-y-4">
          <Input
            label={`Additional Quantity (${restockModalItem?.unit || 'units'})`}
            type="number"
            min="1"
            value={restockQty}
            onChange={(e) => setRestockQty(e.target.value)}
            required
          />

          <p className="text-xs text-slate-600 bg-slate-50 p-3 rounded-xl border border-slate-200">
            Current count: <strong>{restockModalItem?.quantity}</strong>. New total will be{' '}
            <strong className="text-[#26658c]">{(restockModalItem?.quantity || 0) + (parseInt(restockQty, 10) || 0)} {restockModalItem?.unit}</strong>.
          </p>

          <div className="flex justify-end gap-3 pt-4 border-t border-slate-100">
            <Button variant="ghost" size="sm" type="button" onClick={() => setRestockModalItem(null)}>
              Cancel
            </Button>
            <Button variant="primary" size="sm" type="submit" icon={Plus}>
              Confirm Restock
            </Button>
          </div>
        </form>
      </Modal>

      {/* Add New Item Modal */}
      <Modal
        isOpen={isNewItemModalOpen}
        onClose={() => setIsNewItemModalOpen(false)}
        title="Add New Essential Item"
        subtitle="Track a new nursery product, consumable, or medical essential"
      >
        <form onSubmit={handleAddNewItem} className="space-y-4">
          <Input
            label="Product Name"
            placeholder="e.g. Diapers Size 4 (Ultra-Dry)"
            value={newItem.name}
            onChange={(e) => setNewItem({ ...newItem, name: e.target.value })}
            required
          />

          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-1.5">
              <label className="block text-xs font-semibold text-[#023859] uppercase tracking-wider">
                Category
              </label>
              <select
                value={newItem.category}
                onChange={(e) => setNewItem({ ...newItem, category: e.target.value })}
                className="w-full rounded-xl border border-slate-300 bg-white px-3 py-2.5 text-sm text-[#011c40]"
              >
                {categories.filter(c => c !== 'All').map(c => (
                  <option key={c} value={c}>{c}</option>
                ))}
              </select>
            </div>

            <Input
              label="Unit of Measurement"
              placeholder="e.g. pcs, bottles, packs"
              value={newItem.unit}
              onChange={(e) => setNewItem({ ...newItem, unit: e.target.value })}
              required
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <Input
              label="Current Quantity"
              type="number"
              value={newItem.quantity}
              onChange={(e) => setNewItem({ ...newItem, quantity: e.target.value })}
              required
            />
            <Input
              label="Minimum Alert Threshold"
              type="number"
              value={newItem.minThreshold}
              onChange={(e) => setNewItem({ ...newItem, minThreshold: e.target.value })}
              required
            />
          </div>

          <Input
            label="Expiry Date (Optional)"
            type="date"
            value={newItem.expiryDate}
            onChange={(e) => setNewItem({ ...newItem, expiryDate: e.target.value })}
          />

          <Textarea
            label="Notes"
            rows={2}
            placeholder="e.g. Preferred brand, storage location"
            value={newItem.notes}
            onChange={(e) => setNewItem({ ...newItem, notes: e.target.value })}
          />

          <div className="flex justify-end gap-3 pt-4 border-t border-slate-100">
            <Button variant="ghost" size="sm" type="button" onClick={() => setIsNewItemModalOpen(false)}>
              Cancel
            </Button>
            <Button variant="primary" size="sm" type="submit" icon={Plus}>
              Save Item
            </Button>
          </div>
        </form>
      </Modal>
    </div>
  );
}

export default EssentialsPage;
