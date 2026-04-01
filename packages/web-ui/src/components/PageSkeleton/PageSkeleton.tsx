import './PageSkeleton.css';

function PageSkeleton() {
  return (
    <div className="page-skeleton">
      <div className="skeleton-block skeleton-nav" />

      <div className="skeleton-section">
        <div className="skeleton-content">
          <div className="skeleton-block skeleton-title" />
          <div className="skeleton-block skeleton-avatar" />
          <div className="skeleton-lines">
            <div className="skeleton-block skeleton-line" />
            <div className="skeleton-block skeleton-line" />
            <div className="skeleton-block skeleton-line" />
            <div className="skeleton-block skeleton-line" />
            <div className="skeleton-block skeleton-line" />
          </div>
        </div>
      </div>
    </div>
  );
}

export default PageSkeleton;
