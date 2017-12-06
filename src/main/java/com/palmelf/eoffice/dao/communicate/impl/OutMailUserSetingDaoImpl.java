package com.palmelf.eoffice.dao.communicate.impl;

import com.palmelf.core.dao.impl.BaseDaoImpl;
import com.palmelf.eoffice.dao.communicate.OutMailUserSetingDao;
import com.palmelf.eoffice.model.communicate.OutMailUserSeting;

import java.util.List;

public class OutMailUserSetingDaoImpl extends BaseDaoImpl<OutMailUserSeting>
		implements OutMailUserSetingDao {
	public OutMailUserSetingDaoImpl() {
		super(OutMailUserSeting.class);
	}

	public OutMailUserSeting getByLoginId(Long loginid) {
		String hql = "select a from OutMailUserSeting a where a.appUser.userId =?";

		List loginList = findByHql(hql, new Object[] { loginid });

		if ((loginList != null) && (loginList.size() > 0)) {
			return (OutMailUserSeting) loginList.get(0);
		}

		return null;
	}
}
