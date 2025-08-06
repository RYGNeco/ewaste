import React, { useEffect, useState } from 'react';
import { getFirestore, collection, query, where, getDocs, doc, updateDoc, Timestamp } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

interface UserRequest {
  uid: string;
  email: string;
  displayName: string;
  userType: 'employee' | 'partner';
  requestedRole: string;
  organization?: string;
  createdAt: Timestamp;
  approved: boolean;
  rejected?: boolean;
}

const AdminApproval: React.FC<{}> = () => {
  const [pendingRequests, setPendingRequests] = useState<UserRequest[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();
  const auth = getAuth();
  const db = getFirestore();

  useEffect(() => {
    // Check if user is admin
    const checkAdminStatus = async () => {
      const user = auth.currentUser;
      if (!user) {
        navigate('/login');
        return;
      }

      const idTokenResult = await user.getIdTokenResult();
      const isAdmin = idTokenResult.claims.role === 'admin';
      
      if (!isAdmin) {
        navigate('/admin');
        return;
      }

      // Fetch pending requests
      loadPendingRequests();
    };

    checkAdminStatus();
  }, [auth, navigate]);

  const loadPendingRequests = async () => {
    try {
      const pendingQuery = query(
        collection(db, 'users'),
        where('approved', '==', false),
        where('rejected', '==', false)
      );

      const querySnapshot = await getDocs(pendingQuery);
      const requests: UserRequest[] = [];

      querySnapshot.forEach((doc) => {
        requests.push({ uid: doc.id, ...doc.data() } as UserRequest);
      });

      setPendingRequests(requests.sort((a, b) => b.createdAt.seconds - a.createdAt.seconds));
    } catch (error) {
      console.error('Error loading requests:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleApproval = async (uid: string, approved: boolean) => {
    try {
      setIsLoading(true);

      // Update Firestore
      const userRef = doc(db, 'users', uid);
      await updateDoc(userRef, {
        approved,
        rejected: !approved,
        updatedAt: Timestamp.now()
      });

      // Update custom claims via backend
      await axios.post('/api/auth/update-claims', {
        uid,
        claims: {
          approved,
          rejected: !approved
        }
      });

      // Refresh the list
      await loadPendingRequests();

      alert(`User request ${approved ? 'approved' : 'rejected'} successfully`);
    } catch (error) {
      console.error('Error updating user status:', error);
      alert('Failed to update user status. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="w-8 h-8 border-4 border-green-500 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">User Approval Dashboard</h1>

      {pendingRequests.length === 0 ? (
        <div className="bg-white rounded-lg shadow-md p-6 text-center">
          <p className="text-gray-600">No pending approval requests</p>
        </div>
      ) : (
        <div className="grid gap-6">
          {pendingRequests.map((request) => (
            <div key={request.uid} className="bg-white rounded-lg shadow-md p-6">
              <div className="flex flex-wrap justify-between items-start">
                <div className="space-y-2">
                  <h2 className="text-xl font-semibold text-gray-900">{request.displayName}</h2>
                  <p className="text-gray-600">{request.email}</p>
                  <div className="space-x-2">
                    <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-800">
                      {request.userType}
                    </span>
                    {request.requestedRole && (
                      <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-purple-100 text-purple-800">
                        {request.requestedRole}
                      </span>
                    )}
                  </div>
                  {request.organization && (
                    <p className="text-gray-600">
                      <span className="font-medium">Organization:</span> {request.organization}
                    </p>
                  )}
                  <p className="text-gray-500 text-sm">
                    Requested: {new Date(request.createdAt.seconds * 1000).toLocaleString()}
                  </p>
                </div>

                <div className="flex gap-4 mt-4 sm:mt-0">
                  <button
                    onClick={() => handleApproval(request.uid, true)}
                    className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
                  >
                    Approve
                  </button>
                  <button
                    onClick={() => handleApproval(request.uid, false)}
                    className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
                  >
                    Reject
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AdminApproval;
