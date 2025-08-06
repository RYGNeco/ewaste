// Role Requests API Service
import api from '../utils/api';

export interface RoleRequest {
  _id: string;
  employeeId: string;
  employeeEmail: string;
  employeeName: string;
  requestedRoles: string[];
  requestReason: string;
  status: 'pending' | 'approved' | 'rejected';
  priority: 'low' | 'medium' | 'high';
  reviewedBy?: string;
  reviewedAt?: Date;
  approvedRoles?: string[];
  rejectionReason?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface RoleRequestStats {
  pending: number;
  approved: number;
  rejected: number;
  total: number;
  pendingPercentage: number;
  approvedPercentage: number;
  rejectedPercentage: number;
}

class RoleRequestService {
  // Get all pending role requests (Super Admin only)
  async getPendingRoleRequests(): Promise<RoleRequest[]> {
    try {
      const response = await api.get('/role-requests/pending');
      if (response && response.ok) {
        const data = await response.json();
        return data.data;
      }
      throw new Error('Failed to fetch pending role requests');
    } catch (error) {
      console.error('Error fetching pending role requests:', error);
      throw error;
    }
  }

  // Get all role requests with filters (Super Admin only)
  async getAllRoleRequests(filters?: {
    status?: string;
    page?: number;
    limit?: number;
  }): Promise<{
    data: RoleRequest[];
    pagination: {
      page: number;
      limit: number;
      total: number;
      pages: number;
    };
  }> {
    try {
      const params = new URLSearchParams();
      if (filters?.status && filters.status !== 'all') {
        params.append('status', filters.status);
      }
      if (filters?.page) {
        params.append('page', filters.page.toString());
      }
      if (filters?.limit) {
        params.append('limit', filters.limit.toString());
      }

      const response = await api.get(`/role-requests?${params.toString()}`);
      if (response && response.ok) {
        const data = await response.json();
        return {
          data: data.data,
          pagination: data.pagination
        };
      }
      throw new Error('Failed to fetch role requests');
    } catch (error) {
      console.error('Error fetching role requests:', error);
      throw error;
    }
  }

  // Approve role request (Super Admin only)
  async approveRoleRequest(
    requestId: string,
    approvedRoles: string[],
    notes?: string
  ): Promise<any> {
    try {
      const response = await api.put(`/role-requests/${requestId}/approve`, {
        approvedRoles,
        notes
      });
      if (response && response.ok) {
        const data = await response.json();
        return data;
      }
      throw new Error('Failed to approve role request');
    } catch (error) {
      console.error('Error approving role request:', error);
      throw error;
    }
  }

  // Reject role request (Super Admin only)
  async rejectRoleRequest(
    requestId: string,
    rejectionReason: string
  ): Promise<any> {
    try {
      const response = await api.put(`/role-requests/${requestId}/reject`, {
        rejectionReason
      });
      if (response && response.ok) {
        const data = await response.json();
        return data;
      }
      throw new Error('Failed to reject role request');
    } catch (error) {
      console.error('Error rejecting role request:', error);
      throw error;
    }
  }

  // Get role request statistics (Super Admin only)
  async getRoleRequestStats(): Promise<RoleRequestStats> {
    try {
      const response = await api.get('/role-requests/stats');
      if (response && response.ok) {
        const data = await response.json();
        return data.data;
      }
      throw new Error('Failed to fetch role request statistics');
    } catch (error) {
      console.error('Error fetching role request stats:', error);
      throw error;
    }
  }

  // Get user's own role requests
  async getUserRoleRequests(): Promise<RoleRequest[]> {
    try {
      const response = await api.get('/role-requests/my-requests');
      if (response && response.ok) {
        const data = await response.json();
        return data.data;
      }
      throw new Error('Failed to fetch user role requests');
    } catch (error) {
      console.error('Error fetching user role requests:', error);
      throw error;
    }
  }

  // Create a new role request (Employee)
  async createRoleRequest(data: {
    requestedRoles: string[];
    requestReason: string;
    priority?: 'low' | 'medium' | 'high';
  }): Promise<RoleRequest> {
    try {
      const response = await api.post('/role-requests', data);
      if (response && response.ok) {
        const responseData = await response.json();
        return responseData.data;
      }
      throw new Error('Failed to create role request');
    } catch (error) {
      console.error('Error creating role request:', error);
      throw error;
    }
  }
}

export default new RoleRequestService();
