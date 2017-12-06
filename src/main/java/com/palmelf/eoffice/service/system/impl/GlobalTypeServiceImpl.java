package com.palmelf.eoffice.service.system.impl;

import com.palmelf.core.service.impl.BaseServiceImpl;
import com.palmelf.eoffice.dao.system.GlobalTypeDao;
import com.palmelf.eoffice.model.system.GlobalType;
import com.palmelf.eoffice.service.system.GlobalTypeService;

import java.util.List;

public class GlobalTypeServiceImpl extends BaseServiceImpl<GlobalType>
		implements GlobalTypeService {
	private GlobalTypeDao dao;

	public GlobalTypeServiceImpl(GlobalTypeDao dao) {
		super(dao);
		this.dao = dao;
	}

	public List<GlobalType> getByParentIdCatKey(Long parentId, String catKey) {
		return this.dao.getByParentIdCatKey(parentId, catKey);
	}

	public Integer getCountsByParentId(Long parentId) {
		return this.dao.getCountsByParentId(parentId);
	}

	public void mulDel(Long proTypeId) {
		GlobalType globalType = get(proTypeId);
		this.dao.evict(globalType);

		List<GlobalType> subList = this.dao.getByPath(globalType.getPath());

		for (GlobalType gt : subList)
			this.dao.remove(gt);
	}
}
