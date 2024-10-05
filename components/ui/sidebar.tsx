import { User, Home, Star, LogOut } from 'lucide-react';
import { Button } from '@/components/ui/button';

export function Sidebar({ userInfo }) {
  return (
    <div className="w-64 bg-gray-100 p-4 flex flex-col h-full">
      <div className="flex-1">
        <Button variant="ghost" className="w-full justify-start mb-2">
          <Home className="mr-2 h-4 w-4" /> Home
        </Button>
        <Button variant="ghost" className="w-full justify-start mb-2">
          <Star className="mr-2 h-4 w-4" /> Favorites
        </Button>
        {/* Add more menu items here */}
      </div>
      <div className="border-t pt-4">
        {userInfo && (
          <div className="flex items-center mb-4">
            <User className="h-10 w-10 rounded-full bg-gray-300 p-2" />
            <div className="ml-2">
              <div className="font-semibold">{userInfo.name}</div>
              <div className="text-sm text-gray-500">{userInfo.email}</div>
            </div>
          </div>
        )}
        <Button variant="ghost" className="w-full justify-start">
          <LogOut className="mr-2 h-4 w-4" /> Logout
        </Button>
      </div>
    </div>
  );
}